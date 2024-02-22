/* Footprint for the Azoteq TPS65 Trackpad
The Azoteq line has what they call a "hotbar" which has 2.00mm pitch that I find a lot easier to deal with than the FFC connector
This footprint includes a silk for the trackpad itself and six solder pads to match up to the six pads on the "hotbar"
It is designed to be soldered to 6P, SMD, right angle, PH 2.00mm sockets like these: https://www.aliexpress.us/item/3256802928739446.html
Then connected to the trackpad using a 6P, PH 2.0mm, same side, 10cm-long, Double Head Terminal Wire like this one: https://www.aliexpress.us/item/3256805957087430.html

In my experience, you only need the first four pins, SDA, SCL, VCC, and GND to get the trackpad to work with QMK, so 4P connectors and cable could be substituted
*/
module.exports = {
  params: {
    designator: 'VIK',
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
            (module "zzkeeb:Connector_VIK-magnetic-keyboard" (layer F.Cu) (tedit 5DD50112)
            ${p.at /* parametric position */}
            (attr virtual)
            
            (fp_text reference "VIK_K1" (at 0.17 -10.05 90) (layer "Dwgs.User") hide (effects (font (size 1 1) (thickness 0.15))) )
            (fp_text value "Connector_VIK-keyboard" (at 0 -12 90) (layer "F.Fab") hide (effects (font (size 1 1) (thickness 0.15))) )
            (fp_circle (center -2.5 6.5) (end -2.7 6.5) (width 0.1) (layer "B.SilkS") )
            (fp_circle (center -2.5 6.5) (end -2.25 6.5) (width 0.1) (layer "F.SilkS") )
            (pad "1" thru_hole circle (at -1.1 5.5 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.V3V.str} )
            (pad "2" thru_hole circle (at 1.1 5.5 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.GND.str} )
            (pad "3" thru_hole circle (at -1.1 3.3 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SDA.str} )
            (pad "4" thru_hole circle (at 1.1 3.3 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SCL.str} )
            (pad "5" thru_hole circle (at -1.1 1.1 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.RGB_LED_OUT.str} )
            (pad "6" thru_hole circle (at 1.1 1.1 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.V5V.str} )
            (pad "7" thru_hole circle (at -1.1 -1.1 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.GPIO1.str} )
            (pad "8" thru_hole circle (at 1.1 -1.1 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.MOSI.str} )
            (pad "9" thru_hole circle (at -1.1 -3.3 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.GPIO2.str} )
            (pad "10" thru_hole circle (at 1.1 -3.3 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SPI_CS.str} )
            (pad "11" thru_hole circle (at -1.1 -5.5 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.MISO.str} )
            (pad "12" thru_hole circle (at 1.1 -5.5 270) (size 1.7 1.7) (drill 0.9) (layers "*.Cu" "*.Mask") ${p.SCLK.str} )
            
            (fp_circle (center 0 0) (end 23 0) (width 0.1) (layer "F.SilkS"))
            (fp_circle (center 0 0) (end 27.5 0) (width 0.1) (layer "F.SilkS"))
            ${'' /* (fp_rect (start -3 31.18) (end 3 50.49) (width 0.1) (layer "F.SilkS"))*/ }
         )   
        `
    return footprint;
  }
}
