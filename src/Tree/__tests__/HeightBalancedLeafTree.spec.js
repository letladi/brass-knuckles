const {
  testKeyOrder,
  testWithDifferentKeyInsertionOrders
} = require('./util')
const util = require('../treeUtils')
const Tree = require('../HeightBalancedLeafTree')

describe('HeightBalancedLeafTree', () => {
  describe('properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, Tree)
  })

  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, Tree)
  })
  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, Tree)
  })
})

const computeMinimumLeaveCount = height => {
  const sqrt5 = Math.sqrt(5)
  const sqrt2 = Math.sqrt(2)
  const doubleOfSqrt5 = sqrt5 * 2

  const x = ((3 + sqrt5) / doubleOfSqrt5) * (((1 + sqrt5) / 2) ** height)
  const y = ((3 - sqrt5) / doubleOfSqrt5) * (((1 - sqrt5) / 2) ** height)
  return x - y
}
const computeMaxHeight = leaveCount => {
  const sqrt5 = Math.sqrt(5)
  const CFib = 1 / Math.log2((1 + sqrt5) / 2)
  return Math.ceil(CFib * Math.log2(leaveCount))
}

function testTreeProperties(getTree) {
  const numEl = 100
  const leaveCountForBalancedTree = '(3+√5 / 2√5)(1+√5 / 2)^h - (3-√5 / 2√5)(1-√5 / 2)^h'
  test('if leaveCount = N; height <= approx. 1.44logN', () => {
    const tree = getTree(numEl)
    expect(numEl).toEqual(tree.leaveCount)
    expect(tree.height).toBeLessThanOrEqual(computeMaxHeight(tree.leaveCount))
  })
  test(`if height = h; leaveCount >= ${ leaveCountForBalancedTree }`, () => {
    const tree = getTree(numEl)
    expect(tree.leaveCount).toBeGreaterThanOrEqual(computeMinimumLeaveCount(tree.height))
  })
}

function testInsertion(getTree) {
  const numEl = 100
  it('returns false if insertion failed (like when the key already exists in the tree)', () => {
    const tree =  getTree(numEl)
    expect(tree.insert(5, 'five')).toEqual(false)
  })
  it('returns true if insertion succeeded', () => {
    const tree = getTree(numEl)
    const nextElKey = numEl + 1
    expect(tree.insert(nextElKey, 'eleven')).toEqual(true)
  })
  testKeyOrder(() => getTree(numEl))
  testBalanceCriteria(() => getTree(numEl))
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
    const expectedDeletedValue = keyToDelete * 2 // generateKeysAndValues/util.js
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

function testBalanceCriteria(getTree, beforeVerification = (tree) => tree) {
  it('maintains tree balance criteria', () => {
    const tree = getTree()
    beforeVerification(tree)
    tree.traverse((node) => {
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
