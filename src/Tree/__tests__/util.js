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

function prepareTree(numElements, TreeConstructor, populate) {
  const tree = new TreeConstructor()
  populate(tree, numElements)
  return tree
}

function testForWhenKeysAreInsertedInOrder(testFn, TreeConstructor) {
  describe('when elements are inserted with increasing key order', () => {
    testFn((numEl) => prepareTree(numEl, TreeConstructor, populateInOrder))
  })
}

function testForWhenKeysAreInsertedInReverseOrder(testFn, TreeConstructor) {
  describe('when elements are inserted with decreasing key order', () => {
    testFn((numEl) => prepareTree(numEl, TreeConstructor, populateInReverseOrder))
  })
}

function testForWhenKeysAreInsertedInRandomOrder(testFn, TreeConstructor) {
  describe('when elements are inserted with random key order', () => {
    testFn((numEl) => prepareTree(numEl, TreeConstructor, populateInRandomOrder))
  })
}

function testWithDifferentKeyInsertionOrders(testFn, TreeConstructor) {
  testForWhenKeysAreInsertedInOrder(testFn, TreeConstructor)
  testForWhenKeysAreInsertedInReverseOrder(testFn, TreeConstructor)
  testForWhenKeysAreInsertedInRandomOrder(testFn, TreeConstructor)
}

module.exports = {
  testWithDifferentKeyInsertionOrders
}
