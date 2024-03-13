module.exports = {
    params: {
        designator: 'RB', // for Rat Bite
    },
    body: p => {
        const footprint = `
    (module "zzkeeb:Hole_Breakaway-Tabs" (layer "F.Cu")
        ${p.at /* parametric position */}

        (property "ki_description" "Mounting Hole without connection")
        (property "ki_keywords" "mounting hole")
        (path "/2b6bec09-e8d7-4a05-b994-6a0029410ea5")
        (attr virtual)
        (fp_text reference "BR1" (at 0 -1.016 90) (layer "F.Fab") hide
            (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_text value "MountingHole" (at -0.05 0.75 90) (layer "F.Fab") hide
            (effects (font (size 1 1) (thickness 0.15)))
        )
        (fp_line (start -3 -0.2) (end 3 -0.2) (width 0.12) (layer "Dwgs.User") )
        (fp_line (start -3 0.2) (end 3 0.2) (width 0.12) (layer "Dwgs.User") )
        (pad "" np_thru_hole circle (at -2.375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at -1.78125 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at -1.1875 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at -0.59375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at 0 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at 0.59375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at 1.1875 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at 1.78125 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
        (pad "" np_thru_hole circle (at 2.375 0 90) (size 0.3 0.3) (drill 0.3) (layers "*.Cu" "*.Mask") )
  )
    
    `
        return footprint;
    }
}
