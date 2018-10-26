const Tree = require('../rbTree')
const performGenericLeafTreeTests = require('../../__tests__/LeafTree.spec')
const Node = require('../rbTreeNode')
const { isEven, testWithDifferentKeyInsertionOrders } = require('../../__tests__/util')

describe('rbTree', () => {
  performGenericLeafTreeTests(Tree)
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, Tree)
  })
})

function testTreeProperties(getTree) {
  const numEl = 20000
  const randomElCount = Math.floor(Math.random() * numEl) + 100
  const tree = getTree(randomElCount)
  const height = tree.height
  console.log('height=', height, isEven(height))
  if (isEven(height)) {

    test('for height = h (where h is even); leaveCount >= 2**((h/2)+1) - 1', () => {
      expect(tree.leaveCount).toBeGreaterThanOrEqual(calculateMinLeaveCountForEvenHeight(height))
    })
  } else {
    test('for height = h (where h is odd); leaveCount >= (3/2)*2**((h-1)/2) - 1', () => {
      expect(tree.leaveCount).toBeGreaterThanOrEqual(calculateMinLeaveCountForOddHeight(height))
    })
  }

  test('for leaveCount = n; h <= 2logn - O(1)', () => {
    const tree = getTree(numEl)
    expect(tree.height).toBeLessThanOrEqual(calculateMaxHeight(tree.leaveCount))
  })

  test('if a red node has lower neighbors, they are black', () => {
    const tree = getTree(numEl)
    tree.traverse((node) => {
      if (node.isRed() && !node.isLeaf()) {
        expect(node.left.isBlack()).toEqual(true)
        expect(node.right.isBlack()).toEqual(true)
      }
    })
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
