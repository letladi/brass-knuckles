const { generateKeysAndValues } = require('../../util/util')

function populateNode(count, node) {
  const valuesToAdd = generateKeysAndValues(count)
  valuesToAdd.forEach(([key, val]) => node.add(key, val))
}


module.exports = {
  populateNode,
}
