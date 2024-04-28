const fs = require('fs')

const { loadFont, textToPaths } = require('jscad-text');

const { transforms } = require('@jscad/modeling');

const { solidsAsBlob } = require('@jscad/io');

(async () => {
    // convert the data received to FONT information
    let font = loadFont('./fonts/Habana.ttf')

    // convert text to outline paths
    let paths = textToPaths({font, fontSize: 96, segments: 72}, 'JSCAD is awesome!!!')

    // adjust the paths
    paths = transforms.rotate([0, 0, Math.PI/4], paths)

    // convert the paths to SVG
    const outputData = solidsAsBlob(paths, {format: 'svg'})

    // write the data to file
    const outputFileName = 'test.svg'
    await fs.writeFile(outputFileName, outputData.asBuffer(),
        (err) => {
            if (err) {
                console.log('error writing file:', err)
            } else {
                console.log(`success: see ${outputFileName}`)
            }
        }
    )
})();
