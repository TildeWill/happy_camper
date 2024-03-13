module.exports = {
  params: {
    designator: 'SHIT', //Sunrise Hot Interchange Terminal
    side: "F",
    V3V: {type: 'net', value: 'V3V'},
    GND: {type: 'net', value: 'GND'},
    SDA: {type: 'net', value: 'SDA'},
    SCL: {type: 'net', value: 'SCL'},
    RGB_LED_OUT: {type: 'net', value: 'RGB_LED_OUT'},
    V5V: {type: 'net', value: 'V5V'},
    GPIO1: {type: 'net', value: 'GPIO1'},
    MOSI: {type: 'net', value: 'MOSI'},
    GPIO2: {type: 'net', value: 'GPIO2'},
    SPI_CS: {type: 'net', value: 'SPI_CS'},
    MISO: {type: 'net', value: 'MISO'},
    SCLK: {type: 'net', value: 'SCLK'}
  },
  body: p => {
    const footprint = `
            (module "tildewill:Sunrise-Hot-Interchange-Connector" (layer F.Cu) (tedit 5DD50112)
            ${p.at /* parametric position */}
            (attr virtual)
            
            (fp_text reference "VIK_K1" (at -1.037771 -10.340352) (layer "Dwgs.User") hide
        (effects (font (size 1 1) (thickness 0.15)))
      
    )
    (fp_text value "Connector_VIK-keyboard" (at 0 -12) (layer "F.Fab") hide
        (effects (font (size 1 1) (thickness 0.15)))
      
    )
    (fp_circle (center -6.5 15.6) (end -6.5 15.4) (width 0.1) (layer "B.SilkS") )
    (fp_circle (center -6.5 15.6) (end -6.5 15.85) (width 0.1) (layer "F.SilkS") )
    (fp_circle (center 0 0) (end 23 0) (width 0.1) (layer "F.SilkS") )
    (fp_circle (center 0 0) (end 27.5 0) (width 0.1) (layer "F.SilkS") )
    (fp_line (start -17 14) (end 17 14) (width 0.1) (layer "Edge.Cuts") )
    (fp_arc (start 0 0) (end 17 14) (angle -258.9) (width 0.1) (layer "Edge.Cuts") )
    (pad "1" thru_hole circle (at -5.5 17 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.V3V.str} )
    (pad "2" thru_hole circle (at -5.5 19.2 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.GND.str} )
    (pad "3" thru_hole circle (at -3.3 17 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.SDA.str} )
    (pad "4" thru_hole circle (at -3.3 19.2 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.SCL.str} )
    (pad "5" thru_hole circle (at -1.1 17 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.RGB_LED_OUT.str} )
    (pad "6" thru_hole circle (at -1.1 19.2 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.V5V.str} )
    (pad "7" thru_hole circle (at 1.1 17 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.GPIO1.str} )
    (pad "8" thru_hole circle (at 1.1 19.2 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.MOSI.str} )
    (pad "9" thru_hole circle (at 3.3 17 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.GPIO2.str} )
    (pad "10" thru_hole circle (at 3.3 19.2 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.SPI_CS.str} )
    (pad "11" thru_hole circle (at 5.5 17 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.MISO.str} )
    (pad "12" thru_hole circle (at 5.5 19.2 127) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask")
      ${p.SCLK.str} )
     )   
        `
    return footprint;
  }
}
