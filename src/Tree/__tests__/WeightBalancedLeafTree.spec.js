const assert = require('assert')
const {
  testKeyOrder,
  valueGenerator,
  testWithDifferentKeyInsertionOrders,
} = require('./util')
const {
  weight,
  height,
  leaveCount,
  traverse,
  averageDepth,
} = require('../treeUtils')
const Tree = require('../WeightBalancedLeafTree')
const performGenericLeafTreeTests = require('./LeafTree.spec')

describe('WeightBalancedLeafTree', () => {
  performGenericLeafTreeTests(Tree)
  performTestsSpecificToWeightBalancedTrees(Tree)
})

function performTestsSpecificToWeightBalancedTrees(TreeConstructor) {
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, TreeConstructor)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, TreeConstructor)
  })
  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, TreeConstructor)
  })
  describe('#averageDepth', () => {
    testWithDifferentKeyInsertionOrders(testAverageDepth, TreeConstructor)
  })
}

module.exports = performTestsSpecificToWeightBalancedTrees

function testTreeProperties(getTree) {
  const numEl = 100
  test('if height = h >= 2; leaveCount >= (1 / 1-α)^h', () => {
    const tree = getTree(numEl)
    assert(height(tree) >= 2, 'height must be greater than 2')
    expect(leaveCount(tree)).toBeGreaterThanOrEqual(computeMinLeaveCount(height(tree), tree.alpha))
  })
  const maxHeightFormula = 'log(1 / 1-α)n = (1 / log2(1 / 1-α)) * log2n'
  test(`if leaveCount = n; height <= ${ maxHeightFormula } `, () => {
    const tree = getTree(numEl)
    expect(height(tree)).toBeLessThanOrEqual(computeMaxHeight(leaveCount(tree), tree.alpha))
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
    traverse(tree, (node) => {
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
  const numEl = 2000
  const averageDepthFormula = '(-1 * logn) / (αlogα + (1-α)log(1-α))'
  test(`if leaveCount = n; averageDepth <= ${ averageDepthFormula}`, () => {
    const tree = getTree(numEl)
    expect(averageDepth(tree)).toBeLessThanOrEqual(calculateMaxAverageDepth(leaveCount(tree), tree.alpha))
  })
}

function calculateMaxAverageDepth(leaveCount, alpha) {
  const numerator = -1 * Math.log2(leaveCount)
  const denominator = alpha * Math.log2(alpha) + (1 -alpha) * Math.log2(1 - alpha)
  return numerator / denominator
}
