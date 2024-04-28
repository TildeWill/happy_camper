const { extrudeLinear } = require('@jscad/modeling').extrusions
const svgDeserializer = require('@jscad/svg-deserializer')
const opentype = require('opentype.js');
// import opentype from 'opentype.js'
// import { load } from 'opentype.js'

// case 1: from an URL
const buffer = fetch('/fonts/my.woff').then(res => res.arrayBuffer());
// case 2: from filesystem (node)
const buffer = require('fs').promises.readFile('./my.woff');
// case 3: from an <input type=file id=myfile>
const buffer = document.getElementById('myfile').files[0].arrayBuffer();

// if running in async context:
const font = opentype.parse(await buffer);
console.log(font);

// if not running in async context:
buffer.then(data => {
    const font = opentype.parse(data);
    console.log(font);
})

const main = () => {
    const rawData = fs.readFileSync('fonts/number-small-7-svgrepo-com.svg')
    const geometry = svgDeserializer.deserialize({ filename: 'file.svg', output: 'geometry' }, rawData)
    const paths = outlines.map((segment) => segmentToPath(segment))

    return extrudeLinear({ height: 15 }, paths)
}

module.exports = {main}