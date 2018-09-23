const assert = require('assert')
const {
  testKeyOrder,
  valueGenerator,
  testWithDifferentKeyInsertionOrders
} = require('./util')
const { weight } = require('../treeUtils')
const Tree = require('../WeightBalancedLeafTree')

describe('WeightBalancedLeafTree', () => {
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, Tree)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, Tree)
  })
  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, Tree)
  })
  xdescribe('#averageDepth', () => {
    testWithDifferentKeyInsertionOrders(testAverageDepth, Tree)
  })
})

function testTreeProperties(getTree) {
  const numEl = 100
  test('if height = h >= 2; leaveCount >= (1 / 1-α)^h', () => {
    const tree = getTree(numEl)
    assert(tree.height >= 2, 'height must be greater than 2')
    expect(tree.leaveCount).toBeGreaterThanOrEqual(computeMinLeaveCount(tree.height, tree.alpha))
  })
  const maxHeightFormula = 'log(1 / 1-α)n = (1 / log2(1 / 1-α)) * log2n'
  test(`if leaveCount = n; height <= ${ maxHeightFormula } `, () => {
    const tree = getTree(numEl)
    expect(tree.height).toBeLessThanOrEqual(computeMaxHeight(tree.leaveCount, tree.alpha))
  })
  function computeMinLeaveCount(height, alpha) {
    return (1 / (1 - alpha)) ** height
  }
  function computeMaxHeight(leaveCount, alpha) {
    return (1 / Math.log2(1 / (1 - alpha))) * Math.log2(leaveCount)
  }
}

function testInsertion(getTree) {
  const numEl = 100
  it('returns true if insertion succeeded', () => {
    const tree = getTree(1)
    const nextKey = numEl + 1
    expect(tree.insert(nextKey, 'nextKey')).toEqual(true)

  })
  it('returns false if insertion failed (like when key already exists in the tree)', () => {
    const tree = getTree(numEl)
    const existingKey = Math.floor(numEl / 2)
    expect(tree.insert(existingKey, 'existingKey')).toEqual(false)
  })
  testBalanceCriteria(() => getTree(numEl))
  testKeyOrder(() => getTree(numEl))
}

function isBalanced(node, alpha) {
  return weight(node.left) >= alpha * weight(node) &&
    weight(node.right) >= alpha * weight(node)
}
function testBalanceCriteria(getTree, beforeVerification = (tree) => tree) {
  it('maintains tree balance criteria', () => {
    const tree = getTree()
    beforeVerification(tree)
    tree.traverse((node) => {
      if (!node.isLeaf()) {
        expect(isBalanced(node, tree.alpha)).toEqual(true)
      } else {
        expect(weight(node)).toEqual(1)
      }
    })
  })
}

function testDeletion(getTree) {
  const numEl = 200
  const keyToDelete = Math.floor(numEl / 2)
  it('returns null if deletion failed (when tree is empty)', () => {
    const tree = getTree(0)
    expect(tree.delete(1)).toEqual(null)
  })
  it('returns null if deletion failed (when the key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextElKey = numEl + 1
    expect(tree.delete(nextElKey)).toEqual(null)
  })
  it('returns the deleted value if deletion succeeded', () => {
    const tree = getTree(numEl)
    const expectedDeletedValue = valueGenerator(keyToDelete)
    expect(tree.delete(keyToDelete)).toEqual(expectedDeletedValue)
  })
  it('decreases the leaveCount by one', () => {
    const tree = getTree(numEl)
    const oldLeaveCount = tree.leaveCount
    tree.delete(keyToDelete)
    const expectedLeaveCount = tree.leaveCount
    expect(expectedLeaveCount).toEqual(oldLeaveCount - 1)
  })
  it('decreases the nodeCount by two', () => {
    const tree = getTree(numEl)
    const oldNodeCount = tree.nodeCount
    tree.delete(keyToDelete)
    expect(tree.nodeCount).toEqual(oldNodeCount - 2)
  })
  testKeyOrder(
    () => getTree(numEl),
    (tree) => {
    let numKeysToDelete = Math.floor(numEl / 4)
    while (numKeysToDelete--) tree.delete(numKeysToDelete)
  })
  testBalanceCriteria(
    () => getTree(numEl),
    (tree) => {
      let numKeysToDelete = Math.floor(numEl / 4)
      while (numKeysToDelete--) tree.delete(numKeysToDelete)
    })
}

function testAverageDepth(getTree) {
  const averageDepthFormula = '(-1 * logn) / (αlogα + (1-α)log(1-α))'
  test(`if leaveCount = n; averageDepth <= ${ averageDepthFormula}`)
}
