const { shuffle } = require('lodash')
const { traverse } = require('./treeUtils')

const valueGenerator = key => key * 2

const duplicateValueGenerator = key => `${ valueGenerator(key) }`

function generateKeysAndValues(count, valGenerator = valueGenerator) {
  const ret = []
  for (i = 1; i <= count; i++) {
    ret.push([i, valGenerator(i)])
  }
  return ret
}

function populateInOrder(numElements, insertCb) {
  generateKeysAndValues(numElements).forEach(([key, val]) => {
    insertCb(key, val)
  })
}

function populateInReverseOrder(numElements, insertCb) {
  const data = generateKeysAndValues(numElements)
  for (let i = data.length - 1; i >= 0; i--) {
    insertCb(data[i][0], data[i][1])
  }
}

function populateInRandomOrder(numElements, insertCb) {
  const data = generateKeysAndValues(numElements)
  shuffle(data)
  data.forEach(([key, val]) => {
    insertCb(key, val)
  })
}

function prepareTree(numElements, TreeConstructor, populate, afterInsertCb, useAddMethod) {
  const tree = new TreeConstructor()
  populate(numElements, (key, val) => {
    useAddMethod ? tree.add(key, val) : tree.insert(key, val)
    if (afterInsertCb) afterInsertCb(tree)
  })
  return tree
}

function testKeyOrder(getTree, beforeVerification = (tree) => tree) {
  it('maintains order of the keys', () => {
    const tree = getTree()
    beforeVerification(tree)
    traverse(tree, (node) => {
      if (!node.isLeaf()) {
        const rKey = node.right.key
        const lKey = node.left.key
        expect(lKey).toBeLessThan(node.key)
        expect(node.key).toBeLessThanOrEqual(rKey)
      }
    })
  })
}

function testWithDifferentKeyInsertionOrders(testFn, TreeConstructor) {
  [
    [populateInOrder, 'when elements are inserted with increasing key order'],
    [populateInReverseOrder, 'when elements are inserted with decreasing key order'],
    [populateInRandomOrder, 'when elements are inserted with random key order']
   ].forEach(([populatorFn, testMsg]) => {
     describe(testMsg , () => {
       testFn(function getPopulatedTree(numEl, afterInsertCb, useAddMethod = false) {
         return prepareTree(numEl, TreeConstructor, populatorFn, afterInsertCb, useAddMethod)
       })
     })
   })
}

function addDuplicateValues(tree, numDuplicates, afterInsertCb = tree => tree) {
  while (numDuplicates) {
    tree.insert(numDuplicates, duplicateValueGenerator(numDuplicates))
    afterInsertCb(tree)
    numDuplicates--
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
function getBaseLog(base, y) {
  return Math.log(y) / Math.log(base);
}

function isEven(x) {
  return x % 2 === 0
}

module.exports = {
  isEven,
  testKeyOrder,
  getBaseLog,
  testWithDifferentKeyInsertionOrders,
  valueGenerator,
  duplicateValueGenerator,
  addDuplicateValues,
  generateKeysAndValues,
}
