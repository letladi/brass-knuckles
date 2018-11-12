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
  describe('#delete (when #add is used to insert items)', () => {
    testWithDifferentKeyInsertionOrders(testDeletionWhenAddIsUsed, Tree)
  })
  xdescribe('#remove (which uses top-down deletion)', () => {
    testWithDifferentKeyInsertionOrders(testRemove, Tree)
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

function testRemove(getTree) {
  const numEl = 1000
  it('returns null is deletion failed (when tree is empty)', () => {
    const tree = getTree(0)
    expect(tree.delete(1)).toEqual(null)
  })
  it('returns null if deletion failed (when key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    expect(tree.delete(nextKey)).toEqual(null)
  })
  it('returns and removes the value associated with the deleted key', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    while (numKeysToDelete) {
      expect(tree.delete(numKeysToDelete)).toEqual(valueGenerator(numKeysToDelete))
      numKeysToDelete--
    }
  })
  it('decreases leaveCount by 1', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    let oldLeaveCount = leaveCount(tree)
    while (numKeysToDelete) {
      tree.delete(numKeysToDelete--)
      expect(leaveCount(tree)).toEqual(oldLeaveCount - 1)
      oldLeaveCount = leaveCount(tree)
    }
  })
  it('decreases nodeCount by two', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    let oldNodeCount = nodeCount(tree)
    while (numKeysToDelete) {
      tree.delete(numKeysToDelete--)
      expect(nodeCount(tree)).toEqual(oldNodeCount - 2)
      oldNodeCount = nodeCount(tree)
    }
  })
  it('should be able to remove all inserted values', () => {
    const tree = getTree(numEl)
    expect(tree.isEmpty()).toEqual(false)
    let numToDelete = numEl
    while (numToDelete) tree.remove(numToDelete--)
    expect(tree.isEmpty()).toEqual(true)
  })
}

function testDeletionWhenAddIsUsed(getTree) {
  return testDeletion((numEl) => getTree(numEl, null, true))
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
    xtest('for height = h (where h is even); leaveCount >= 2**((h/2)+1) - 1', () => {
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
