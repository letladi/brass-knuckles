const { shuffle } = require('lodash')

function generateKeysAndValues(count, valGenerator = (key) => key * 2) {
  const ret = []
  for (i = 1; i <= count; i++) {
    ret.push([i, valGenerator(i)])
  }
  return ret
}

function populateInOrder(tree, numElements, afterInsertCb) {
  generateKeysAndValues(numElements).forEach(([key, val]) => {
    tree.insert(key, val)
    afterInsertCb(tree)
  })
}

function populateInReverseOrder(tree, numElements, afterInsertCb) {
  const data = generateKeysAndValues(numElements)
  for (let i = data.length - 1; i >= 0; i--) {
    tree.insert(data[i][0], data[i][1])
    afterInsertCb(tree)
  }
}

function populateInRandomOrder(tree, numElements, afterInsertCb) {
  const data = generateKeysAndValues(numElements)
  shuffle(data)
  data.forEach(([key, val]) => {
    tree.insert(key, val)
    afterInsertCb(tree)
  })
}

function prepareTree(numElements, TreeConstructor, populate, afterInsertCb = (tree) => tree) {
  const tree = new TreeConstructor()
  populate(tree, numElements, afterInsertCb)
  return tree
}

function testKeyOrder(getTree, beforeVerification = (tree) => tree) {
  it('maintains order of the keys', () => {
    const tree = getTree()
    beforeVerification(tree)
    tree.traverse((node) => {
      if (!node.isLeaf()) {
        const rKey = node.right.key
        const lKey = node.left.key
        expect(lKey).toBeLessThan(node.key)
        expect(node.key).toBeLessThanOrEqual(rKey)
      }
    })
  })
}

function testForWhenKeysAreInsertedInOrder(testFn, TreeConstructor) {
  describe('when elements are inserted with increasing key order', () => {
    testFn((numEl, afterInsertCb) => prepareTree(numEl, TreeConstructor, populateInOrder, afterInsertCb))
  })
}

function testForWhenKeysAreInsertedInReverseOrder(testFn, TreeConstructor) {
  describe('when elements are inserted with decreasing key order', () => {
    testFn((numEl, afterInsertCb) => prepareTree(numEl, TreeConstructor, populateInReverseOrder, afterInsertCb))
  })
}

function testForWhenKeysAreInsertedInRandomOrder(testFn, TreeConstructor) {
  describe('when elements are inserted with random key order', () => {
    testFn((numEl, afterInsertCb) => prepareTree(numEl, TreeConstructor, populateInRandomOrder, afterInsertCb))
  })
}

function testWithDifferentKeyInsertionOrders(testFn, TreeConstructor) {
  testForWhenKeysAreInsertedInOrder(testFn, TreeConstructor)
  testForWhenKeysAreInsertedInReverseOrder(testFn, TreeConstructor)
  testForWhenKeysAreInsertedInRandomOrder(testFn, TreeConstructor)
}

module.exports = {
  testKeyOrder,
  testWithDifferentKeyInsertionOrders
}
