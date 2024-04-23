# Keycap Generator

### Purpose
To make it easy to generate 3D models of keycaps that have up to three legends for use in 3D printing.

### Use
`npx jscad input.js -o output.stl`

### Custom Fonts
Use https://github.com/skarab42/jscad-vector-fonts?tab=readme-ov-file to convert one-line SVG fonts to a JS file per the instruction found here: https://openjscad.xyz/dokuwiki/doku.php?id=en:design_guide_text#using_other_fonts

### Printing Notes
.3mm per color layer is okay
.3mm of white still lets through the underlying color
.8mm per color layer is too thick for anything

The top layer is currently sharpest, though may be fixed by partial CMY infills, rather than all white
