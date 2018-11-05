const Tree = require('../rbTree')
const performGenericLeafTreeTests = require('../../__tests__/LeafTree.spec')
const Node = require('../rbTreeNode')
const { isEven, testWithDifferentKeyInsertionOrders } = require('../../__tests__/util')
const { height, leaveCount, traverse } = require('../../treeUtils')

describe('rbTree', () => {
  performGenericLeafTreeTests(Tree)
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, Tree)
  })
  describe('#delete (overridden)', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, Tree)
  })
})

function testDeletion(getTree) {
  const numEl = 1000
  it('should be able to delete all inserted values', () => {
    const tree = getTree(numEl)
    expect(tree.isEmpty()).toEqual(false)
    let numToDelete = numEl
    while (numToDelete) tree.delete(numToDelete--)
    expect(tree.isEmpty()).toEqual(true)
  })
}

function testTreeProperties(getTree) {
  const numEl = 20000
  const randomElCount = Math.floor(Math.random() * numEl) + 100
  const tree = getTree(randomElCount)

  verifyLeaveCountProperty(tree)

  test('for leaveCount = n; h <= 2logn - O(1)', () => {
    const tree = getTree(numEl)
    verifyHeightProperty(tree)
  })

  test('if a red node has lower neighbors, they are black', () => {
    const tree = getTree(numEl)
    verifyColorProperty(tree)
  })
}

function verifyLeaveCountProperty(tree) {
  const h = height(tree)
  if (isEven(h)) {
    test('for height = h (where h is even); leaveCount >= 2**((h/2)+1) - 1', () => {
      expect(leaveCount(tree)).toBeGreaterThanOrEqual(calculateMinLeaveCountForEvenHeight(h))
    })
  } else {
    test('for height = h (where h is odd); leaveCount >= (3/2)*2**((h-1)/2) - 1', () => {
      expect(leaveCount(tree)).toBeGreaterThanOrEqual(calculateMinLeaveCountForOddHeight(h))
    })
  }
}

function verifyHeightProperty(tree) {
  expect(height(tree)).toBeLessThanOrEqual(calculateMaxHeight(leaveCount(tree)))
}

function verifyColorProperty(tree) {
  traverse(tree, (node) => {
    if (node.isRed() && !node.isLeaf()) {
      expect(node.left.isBlack()).toEqual(true)
      expect(node.right.isBlack()).toEqual(true)
    }
  })
}

function calculateMinLeaveCountForOddHeight(h) {
  const exponent = (h - 1) / 2
  return (3 / 2) * (2 ** exponent) - 1
}

function calculateMinLeaveCountForEvenHeight(h) {
  const exponent = (h / 2) + 1
  return (2 ** exponent) - 1
}

function calculateMaxHeight(leaveCount) {
  return 2 * Math.log2(leaveCount) + 1
}
