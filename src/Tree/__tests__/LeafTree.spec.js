const assert = require('assert')
const { testWithDifferentKeyInsertionOrders } = require('./util')
const LeafTree = require('../LeafTree')

describe('LeafTree', () => {
  let tree = null
  beforeEach(() => tree = new LeafTree())

  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, LeafTree)
  })

  describe('.height', () => {
    testWithDifferentKeyInsertionOrders(testTreeHeight, LeafTree)
  })
  xdescribe('.averageDepth (of the leaves)', () => {
    it('should be <= (n - 1)(n + 2) / 2n (approx. 0.5n)')
  })

  describe('#find', () => {
    testWithDifferentKeyInsertionOrders(testFind, LeafTree)
  })

  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, LeafTree)
  })

  describe('.leaveCount', () => {
    testWithDifferentKeyInsertionOrders(testLeaveCount, LeafTree)
  })

  describe('.nodeCount', () => {
    testWithDifferentKeyInsertionOrders(testNodeCount, LeafTree)
  })

  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, LeafTree)
  })

  describe('#intervalFind', () => {
    testWithDifferentKeyInsertionOrders(testIntervalFind, LeafTree)
  })
})

function testTreeProperties(getTree) {
  const numEl = 100
  test('if height = h; leaveCount <= 2**h', () => {
    const tree = getTree(numEl)
    const height = tree.height
    expect(tree.leaveCount).toBeLessThanOrEqual(2**height)
  })
  test('if height = h; leaveCount >= h + 1', () => {
    const tree = getTree(numEl)
    const height = tree.height
    expect(tree.leaveCount).toBeGreaterThanOrEqual(height + 1)
  })
  test('if interiorNodeCount = h; leaveCount = h + 1', () => {
    const tree = getTree(numEl)
    expect(tree.interiorNodeCount).toEqual(tree.leaveCount - 1)
  })
}

function testFind(getTree) {
  it('returns null if the tree is empty', () => {
    const tree = getTree(0)
    expect(tree.find(1)).toEqual(null)
  })
  it('returns null if the a value associated with the query key is not in the tree', () => {
    const tree = getTree(10)
    const nextKey = 10 + 1
    expect(tree.find(nextKey)).toEqual(null)
  })
  it('returns the value associated with the query key if it exists in the tree', () => {
    const numEl = 100
    const tree = getTree(numEl)
    for (let key = 1; key <= numEl; key++) {
      expect(tree.find(key)).toEqual(key * 2)
    }
  })
}

function testTreeHeight(getTree) {
  const numEl = 20
  it('should be >= Math.ceil(log n)', () => {
    const tree = getTree(numEl)
    const logN = Math.log2(tree.nodeCount)
    expect(tree.height).toBeGreaterThanOrEqual(Math.ceil(logN))
  })
  it('should be <= n - 1', () => {
    const tree = getTree(numEl)
    const n = tree.nodeCount
    expect(tree.height).toBeLessThanOrEqual(n - 1)
  })
}

function testLeaveCount(getTree) {
  it('is 0 if empty', () => {
    const tree = getTree()
    expect(tree.leaveCount).toEqual(0)
  })
  it('counts the number of leaves in the tree', () => {
    const numEl = 10
    const tree = getTree(numEl)
    expect(tree.leaveCount).toEqual(numEl)
  })
}

function testInsertion(getTree) {
  const numEl = 20
  it('returns false (fails) if we attempt to insert a key that already exists in the tree', () => {
    const tree = getTree(numEl)
    const existingKey = Math.floor(numEl / 2)
    expect(tree.insert(existingKey, 'existingKey')).toEqual(false)
  })
  it('returns true if insertion succeeded', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    expect(tree.insert(nextKey, 'nextKey')).toEqual(true)
  })
  it('should be able to insert in empty tree', () => {
    const tree = getTree(0)
    tree.insert(1, 'one')
    expect(tree.isEmpty()).toEqual(false)
  })
  it('increases the leaveCount of the tree by one', () => {
    let count = 0
    getTree(numEl, (tree) => {
      expect(tree.leaveCount).toEqual(++count)
    })
  })
  it('increases the nodeCount of the tree by one on the first insert', () => {
    const tree = getTree(1)
    expect(tree.nodeCount).toEqual(1)
  })
  it('increases the nodeCount by two after the first insert', () => {
    let count = 0
    let oldNodeCount = 0
    getTree(numEl, (tree) => {
      if (count) {
        expect(tree.nodeCount).toEqual(oldNodeCount + 2)
      }
      oldNodeCount = tree.nodeCount
      count++
    })
  })
  it('all the key value pairs inserted will exist in the tree', () => {
    let keyCount = numEl
    const tree = getTree(keyCount)
    while (keyCount) expect(tree.find(keyCount--)).not.toEqual(null)
  })
}

function testNodeCount(getTree) {
  const numEl = 20
  it('is 0 if empty', () => {
    const tree = getTree(0)
    expect(tree.nodeCount).toEqual(0)
  })
  it('increases by one on the very first insert', () => {
    const tree = getTree(1)
    expect(tree.nodeCount).toEqual(1)
  })
  it('increases by two after every subsequent insert', () => {
    let count = 0
    let oldNodeCount = 0
    getTree(numEl, (tree) => {
      if (count) {
        expect(tree.nodeCount).toEqual(oldNodeCount + 2)
      }
      count++
      oldNodeCount = tree.nodeCount
    })
  })
}

function testDeletion(getTree) {
  const numEl = 100
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
      expect(tree.delete(numKeysToDelete)).toEqual(numKeysToDelete * 2)
      numKeysToDelete--
    }
  })
  it('decreases leaveCount by 1', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    let oldLeaveCount = tree.leaveCount
    while (numKeysToDelete) {
      tree.delete(numKeysToDelete--)
      expect(tree.leaveCount).toEqual(oldLeaveCount - 1)
      oldLeaveCount = tree.leaveCount
    }
  })
  it('decreases nodeCount by two', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    let oldNodeCount = tree.nodeCount
    while (numKeysToDelete) {
      tree.delete(numKeysToDelete--)
      expect(tree.nodeCount).toEqual(oldNodeCount - 2)
      oldNodeCount = tree.nodeCount
    }
  })
}

function testIntervalFind(getTree) {
  const numEl = 100
  it('returns a type of linked list of the pointers in the interval', () => {
    const tree = getTree(numEl)
    const intervalStart = Math.floor(numEl / 10)
    const intervalEnd = intervalStart + 10

    let interval = tree.intervalFind(intervalStart, intervalEnd)
    let key = intervalStart
    while (key < intervalEnd) {
      expect(interval.key).toEqual(key)
      expect(interval.value).toEqual(key * 2)
      interval = interval.right
      key++
    }
  })
  it('returns null if there are no elements in the specified interval', () => {
    const tree = getTree(numEl)
    const intervalStart = numEl + 10
    const intervalEnd = intervalStart + 10
    expect(tree.intervalFind(intervalStart, intervalEnd)).toEqual(null)
  })
  it('excludes elements equal to the closing interval key', () => {
    const tree = getTree(Math.floor(numEl / 10))
    const interval = tree.intervalFind(1, 2)
    expect(interval.right).toEqual(null)
  })
}
