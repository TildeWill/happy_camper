//$fn = 20;

layer0Thickness = 0.6;
layer1Thickness = 0.6;
layer2Thickness = 0.6;
layer3Thickness = 0.6;

module allFill(primaryChar, secondaryChar, tertiaryChar, size, thickness) {
    intersection()  {
        sheet(size, thickness);
        character(primaryChar, size, thickness);
        character(secondaryChar, size, thickness);
    }
}

module secondaryFill(primaryChar, secondaryChar, tertiaryChar, size, thickness) {
    intersection() {
        sheet(size, thickness);
        difference() {
            difference() {
                character(secondaryChar, size, thickness);
                tertiaryFill(primaryChar, secondaryChar, tertiaryChar, size, thickness);
            }
            allFill(primaryChar, secondaryChar, tertiaryChar, size, thickness);
        }
    }
}

module tertiaryFill(primaryChar, secondaryChar, tertiaryChar, size, thickness) {
    difference() {
        intersection()  {
            sheet(size, thickness);
            character(secondaryChar, size, thickness);
            character(tertiaryChar, size, thickness);
        }
        allFill(primaryChar, secondaryChar, tertiaryChar, size, thickness);
    }
}

module sheet(size=5, thickness=0.3) {
    translate([-size/2,-size/2,0]) cube([size,size,thickness], center=false);
}

module character(char, size, thickness) {
    translate([0,(size-charSize)/2 - size/20,-thickness/2]) {
            linear_extrude(height=thickness*2, convexity=4) 
                text(char, 
                     size=charSize,
                     font="Bitstream Vera Sans",
                     halign="center",
                     valign="center");
        }
}

module cyan(primaryChar, secondaryChar, tertiaryChar, size) {
    union() {
        if(renderLayer1) translate([0,0,layer0Thickness]) difference() {
            sheet(size, layer1Thickness);
            character(secondaryChar, size, layer1Thickness);
        }
        
        if(renderLayer2) translate([0,0,layer0Thickness + layer1Thickness]) {
            tertiaryFill(secondaryChar, tertiaryChar, primaryChar, size, layer2Thickness);
        }

        if(renderLayer3) translate([0,0,layer0Thickness + layer1Thickness + layer2Thickness]) {
            secondaryFill(tertiaryChar, primaryChar, secondaryChar, size, layer3Thickness);
        }
    }
}

module magenta(primaryChar, secondaryChar, tertiaryChar, size) {
    union() {
        if(renderLayer1) translate([0,0,layer0Thickness]) {
            secondaryFill(primaryChar, secondaryChar, tertiaryChar, size, layer1Thickness);
        }

        if(renderLayer2) translate([0,0,layer0Thickness + layer1Thickness]) difference() {
            sheet(size, layer2Thickness);
            character(tertiaryChar, size, layer2Thickness);
        }

        if(renderLayer3) translate([0,0,layer0Thickness + layer1Thickness + layer2Thickness]) {
            tertiaryFill(tertiaryChar, primaryChar, secondaryChar, size, layer3Thickness);
        }
    }
}

module yellow(primaryChar, secondaryChar, tertiaryChar, size) {
    union() {
        if(renderLayer1) translate([0,0,layer0Thickness]) {
            tertiaryFill(primaryChar, secondaryChar, tertiaryChar, size, layer1Thickness);
        }

        if(renderLayer2) translate([0,0,layer0Thickness + layer1Thickness]) {
            secondaryFill(secondaryChar, tertiaryChar, primaryChar, size, layer2Thickness);
        }
        if(renderLayer3) translate([0,0,layer0Thickness + layer1Thickness + layer2Thickness]) difference() {
            sheet(size, layer3Thickness);
            character(primaryChar, size, layer3Thickness);
        }
    }
}

module white(primaryChar, secondaryChar, tertiaryChar, size) {
    union() {
        if(renderLayer0) translate([0,0,0]) sheet(size, layer0Thickness);
        
        if(renderLayer1) translate([0,0,layer0Thickness]) {
            allFill(primaryChar, secondaryChar, tertiaryChar, size, layer1Thickness);
        }
        
        if(renderLayer2) translate([0,0,layer0Thickness+layer1Thickness]) difference() {
            allFill(secondaryChar, tertiaryChar, primaryChar, size, layer2Thickness);
        }    
        
       if(renderLayer3) translate([0,0,layer0Thickness+layer1Thickness+layer2Thickness]) {
            allFill(tertiaryChar, primaryChar, secondaryChar, size, layer3Thickness);
        }
    }
}

size = 17;
charSize = 5;
renderLayer0 = true;
renderLayer1 = true;
renderLayer2 = true;
renderLayer3 = true;
showAll = true;
chromaphane = "a";

if(!showAll) {
    intersection() {
        union() {
            color("cyan") render()       cyan("W", "%", "7", size);
            color("magenta") render() magenta("W", "%", "7", size);
            color("yellow") render()   yellow("W", "%", "7", size);
            color("white") render()     white("W", "%", "7", size);
        }
        color("lime") render() character("%", size, 2);
    }
}

if(showAll) {
    if(chromaphane == "a" || chromaphane == "c") color("cyan") render()       cyan("W", "%", "7", size);
    if(chromaphane == "a" || chromaphane == "m") color("magenta") render() magenta("W", "%", "7", size);
    if(chromaphane == "a" || chromaphane == "y") color("yellow") render()   yellow("W", "%", "7", size);
    if(chromaphane == "a" || chromaphane == "w") color("white") render()     white("W", "%", "7", size);
}
echo(version=version());

