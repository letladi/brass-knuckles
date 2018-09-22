const { shuffle } = require('lodash')

function generateKeysAndValues(count, valGenerator = (key) => key * 2) {
  const ret = []
  for (i = 1; i <= count; i++) {
    ret.push([i, valGenerator(i)])
  }
  return ret
}

function populateInOrder(tree, numElements) {
  generateKeysAndValues(numElements).forEach(([key, val]) => tree.insert(key, val))
}

function populateInReverseOrder(tree, numElements) {
  const data = generateKeysAndValues(numElements)
  for (let i = data.length - 1; i >= 0; i--) {
    tree.insert(data[i][0], data[i][1])
  }
}

function populateInRandomOrder(tree, numElements) {
  const data = generateKeysAndValues(numElements)
  shuffle(data)
  data.forEach(([key, val]) => tree.insert(key, val))
}

module.exports = {
  populateInOrder,
  populateInReverseOrder,
  populateInRandomOrder,
}
