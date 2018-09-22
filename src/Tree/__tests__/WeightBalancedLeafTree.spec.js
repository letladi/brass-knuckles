const assert = require('assert')
const { testWithDifferentKeyInsertionOrders } = require('./util')
const util = require('../treeUtils')
const Tree = require('../WeightBalancedLeafTree')

describe('WeightBalancedLeafTree', () => {
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, Tree)
  })
  xdescribe('#insert', () => {
    it('returns true if insertion succeeded')
    it('returns false if insertion failed (like when key already exists in the tree)')
    it('maintains tree balance criteria')
    it('maintains key order')
  })
  xdescribe('#delete')
})

function testTreeProperties(getTree) {
  const computeMinLeaveCount = (height, alpha) => {
    return (1 / (1 - alpha)) ** height
  }
  const computeMaxHeight = (leaveCount, alpha) => {
    return (1 / Math.log2(1 / (1 - alpha))) * Math.log2(leaveCount)
  }
  test('if height = h >= 2; leaveCount >= (1 / 1-α)^h', () => {
    const tree = getTree(200)
    assert(tree.height >= 2, 'height must be greater than 2')
    expect(tree.leaveCount).toBeGreaterThanOrEqual(computeMinLeaveCount(tree.height, tree.alpha))
  })
  test('if leaveCount = n; height <= log(1 / 1-α)n = (1 / log2(1 / 1-α)) * log2n', () => {
    const tree = getTree(200)
    expect(tree.height).toBeLessThanOrEqual(computeMaxHeight(tree.leaveCount, tree.alpha))
  })
}
