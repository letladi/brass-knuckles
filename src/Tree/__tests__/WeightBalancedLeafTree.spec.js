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
