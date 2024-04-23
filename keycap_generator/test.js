const { extrudeLinear } = require('@jscad/modeling').extrusions
const svgDeserializer = require('@jscad/svg-deserializer')


const main = () => {
    const rawData = fs.readFileSync('fonts/number-small-7-svgrepo-com.svg')
    const geometry = svgDeserializer.deserialize({ filename: 'file.svg', output: 'geometry' }, rawData)
    const paths = outlines.map((segment) => segmentToPath(segment))

    return extrudeLinear({ height: 15 }, paths)
}

module.exports = {main}