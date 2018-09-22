const { shuffle } = require('lodash')

function range(start, end, includeEnd = true) {
  const ret = []
  for (i = start, max = (includeEnd) ? end + 1 : end; i < max; i++) {
    ret.push([i, i * 2])
  }
  return ret
}

function populateInOrder(tree, numElements) {
  range(1, numElements).forEach(([key, val]) => tree.insert(key, val))
}

function populateInReverseOrder(tree, numElements) {
  const data = range(1, numElements)
  for (let i = data.length - 1; i >= 0; i--) {
    tree.insert(data[0], data[1])
  }
}

function populateInRandomOrder(tree, numElements) {
  const data = range(1, numElements)
  shuffle(data)
  data.forEach(([key, val]) => tree.insert(key, val))
}

module.exports = {
  range,
  populateInOrder,
  populateInReverseOrder,
  populateInRandomOrder,
}
