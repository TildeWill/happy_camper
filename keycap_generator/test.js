const jscad = require('@jscad/modeling')
const { cylinder } = jscad.primitives

const hex = (radius, height) => {
    return cylinder({radius, height, segments: 6})
}

const main = () => {
    return hex(6, 2)
}

module.exports = { main }