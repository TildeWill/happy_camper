# .DELETE_ON_ERROR:
.SECONDARY:
.PHONY: clean all setup
.DEFAULT: all

container_cmd ?= docker
container_args ?= -w /board -v $(shell pwd):/board --rm
kikit ?= yaqwsx/kikit:v1.3.0
PCB_LIST = board
CASE_PARTS =
setup:
	npm install

input/config.yaml:
	npx yaml-merge input/meta.yaml input/units.yaml input/points.yaml input/outlines.yaml input/cases.yaml input/pcbs.yaml > input/config.yaml

output/generated: input/config.yaml
	npx ergogen input/ --debug
	touch output/generated

output/pcbs/%.dsn: output/generated
	# file can not be present or the script will refuse to run
	if [ -f "$@" ] ; then rm -f $@ ; fi
	${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/export_dsn.py output/pcbs/$*.kicad_pcb $@

output/routed_pcbs/%.ses: output/pcbs/%.dsn
	mkdir -p $(shell dirname $@)
	${container_cmd} run ${container_args} soundmonster/freerouting_cli:v0.1.0 java -jar /opt/freerouting_cli.jar -ap 10 -mt 26 -de $< -do $@

output/routed_pcbs/%.kicad_pcb: output/routed_pcbs/%.ses output/generated
	mkdir -p $(shell dirname $@)
	# file can not be present or the script will refuse to run
	if [ -f "$@" ] ; then rm -f $@ ; fi
	${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/import_ses.py output/pcbs/$*.kicad_pcb $< --output-file $@

output/routed_pcbs/%-drc/: output/routed_pcbs/%.kicad_pcb
	mkdir -p $@
	${container_cmd} run ${container_args} soundmonster/kicad-automation-scripts:latest /usr/lib/python2.7/dist-packages/kicad-automation/pcbnew_automation/run_drc.py  $< $@

output/routed_pcbs/%-front.png: output/routed_pcbs/%.kicad_pcb
	mkdir -p $(shell dirname $@)
	${container_cmd} run --entrypoint pcbdraw ${container_args} ${kikit} plot --style oshpark-afterdark.json output/routed_pcbs/$*.kicad_pcb $@
	cp $@ images/

output/routed_pcbs/%-back.png: output/routed_pcbs/%.kicad_pcb
	mkdir -p $(shell dirname $@)
	${container_cmd} run --entrypoint pcbdraw ${container_args} ${kikit} plot --side back --style oshpark-afterdark.json output/routed_pcbs/$*.kicad_pcb $@
	cp $@ images/

output/pcbs/%-front.png: output/generated
	mkdir -p $(shell dirname $@)
	${container_cmd} run --entrypoint pcbdraw ${container_args} ${kikit} plot --style oshpark-afterdark.json output/pcbs/$*.kicad_pcb $@

output/pcbs/%-back.png: output/generated
	mkdir -p $(shell dirname $@)
	${container_cmd} run --entrypoint pcbdraw ${container_args} ${kikit} plot --side back --style oshpark-afterdark.json output/pcbs/$*.kicad_pcb $@

output/gerbers/%/gerbers.zip: output/routed_pcbs/%.kicad_pcb
	mkdir -p $(shell dirname $@)
	${container_cmd} run --entrypoint kikit ${container_args} ${kikit} fab jlcpcb --no-drc --no-assembly $< $(shell dirname $@)

output/cases/%.stl: output/generated
	mkdir -p $(shell dirname $@)
	npx @jscad/cli@1 output/cases/$*.jscad -of stla -o $@

clean:
	rm -rf output
	rm -f input/config.yaml

all: \
	$(addprefix output/routed_pcbs/, $(addsuffix -front.png, $(PCB_LIST))) \
	$(addprefix output/routed_pcbs/, $(addsuffix -back.png, $(PCB_LIST))) \
	$(addprefix output/cases/, $(addsuffix .stl, $(CASE_PARTS))) \
	$(addprefix output/gerbers/, $(addsuffix /gerbers.zip, $(PCB_LIST))) \

preview: \
	$(addprefix output/pcbs/, $(addsuffix -front.png, $(PCB_LIST))) \
	$(addprefix output/pcbs/, $(addsuffix -back.png, $(PCB_LIST))) \
	$(addprefix output/cases/, $(addsuffix .stl, $(CASE_PARTS))) \


