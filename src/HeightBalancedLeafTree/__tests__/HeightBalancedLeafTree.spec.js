const {
  testKeyOrder,
  valueGenerator,
  testWithDifferentKeyInsertionOrders
} = require('../../util/util')
const util = require('../../util/treeUtils')
const Tree = require('../HeightBalancedLeafTree')
const performGenericLeafTreeTests = require('../../LeafTree/__tests__/LeafTree.spec')

describe('HeightBalancedLeafTree', () => {
  performGenericLeafTreeTests(Tree)
  performTestsSpecificToHeightBalancedTrees(Tree)
})

function performTestsSpecificToHeightBalancedTrees(TreeConstructor) {
  describe('properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, TreeConstructor)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, TreeConstructor)
  })
  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, TreeConstructor)
  })
}

module.exports = performTestsSpecificToHeightBalancedTrees

function computeMinimumLeaveCount(height) {
  const sqrt5 = Math.sqrt(5)
  const sqrt2 = Math.sqrt(2)
  const doubleOfSqrt5 = sqrt5 * 2

  const x = ((3 + sqrt5) / doubleOfSqrt5) * (((1 + sqrt5) / 2) ** height)
  const y = ((3 - sqrt5) / doubleOfSqrt5) * (((1 - sqrt5) / 2) ** height)
  return x - y
}

function computeMaxHeight(leaveCount) {
  const sqrt5 = Math.sqrt(5)
  const CFib = 1 / Math.log2((1 + sqrt5) / 2)
  return Math.ceil(CFib * Math.log2(leaveCount))
}

function testTreeProperties(getTree) {
  const numEl = 100
  const leaveCountForBalancedTree = '(3+√5 / 2√5)(1+√5 / 2)^h - (3-√5 / 2√5)(1-√5 / 2)^h'
  test('if leaveCount = N; height <= approx. 1.44logN', () => {
    const tree = getTree(numEl)
    expect(numEl).toEqual(util.leaveCount(tree))
    expect(util.height(tree)).toBeLessThanOrEqual(computeMaxHeight(util.leaveCount(tree)))
  })
  test(`if height = h; leaveCount >= ${ leaveCountForBalancedTree }`, () => {
    const tree = getTree(numEl)
    expect(util.leaveCount(tree)).toBeGreaterThanOrEqual(computeMinimumLeaveCount(util.height(tree)))
  })
}

function testInsertion(getTree) {
  const numEl = 100
  testKeyOrder(() => getTree(numEl))
  testBalanceCriteria(() => getTree(numEl))
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

function testBalanceCriteria(getTree, beforeVerification = (tree) => tree) {
  it('maintains tree balance criteria', () => {
    const tree = getTree()
    beforeVerification(tree)
  util.traverse(tree, (node) => {
      if (!node.isLeaf()) {
        const rHeight = util.height(node.right)
        const lHeight = util.height(node.left)
        const balanceFactor = Math.abs(lHeight - rHeight)
        expect(balanceFactor).toBeLessThan(2)
      } else {
        expect(util.height(node)).toEqual(0)
      }
    })
  })
}
