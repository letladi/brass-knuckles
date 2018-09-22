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
    it('returns null if the tree is empty', () => {
      expect(tree.find(1)).toEqual(null)
    })
    it('returns null if the a value associated with the query key is not in the tree', () => {
      [[1, 'one'], [2, 'two']].forEach(([key, val]) => tree.insert(key, val))
      expect(tree.find(3)).toEqual(null)
    })
    it('returns the value associated with the query key if it exists in the tree', () => {
      [[1, 'one'], [2, 'two']].forEach(([key, val]) => tree.insert(key, val))
      expect(tree.find(2)).toEqual('two')
    })
  })
  describe('#insert', () => {
    it('returns false (fails) if we attempt to insert a key that already exists in the tree', () => {
      tree.insert(1, 'one')
      expect(tree.insert(1, 'two')).toEqual(false)
    })
    it('returns true if insertion succeeded', () => {
      expect(tree.insert(1, 'one')).toEqual(true)
    })
    it('should be able to insert in empty tree', () => {
      tree.insert(1, 'one')
      expect(tree.isEmpty()).toEqual(false)
    })
    it('should be able to insert in non-empty tree', () => {
      tree.insert(1, 'one')
      expect(tree.insert(2, 'two')).toEqual(true)
    })
    it('increases the leaveCount of the tree by one', () => {
      tree.insert(1, 'one')
      expect(tree.leaveCount).toEqual(1)
      tree.insert(2, 'two')
      expect(tree.leaveCount).toEqual(2)
      tree.insert(3, 'three')
      expect(tree.leaveCount).toEqual(3)
    })
    it('increases the nodeCount of the tree by one on the first insert', () => {
      tree.insert(1, 'one')
      expect(tree.nodeCount).toEqual(1)
    })
    it('increases the nodeCount by two after the first insert', () => {
      tree.insert(1, 'one')
      const prevCount = tree.nodeCount
      tree.insert(2, 'two')
      expect(tree.nodeCount).toEqual(prevCount + 2)
    })
    it('all the key value pairs inserted will exist in the tree', () => {
      tree.insert(1, 'one')
      tree.insert(2, 'two')
      tree.insert(3, 'three')

      expect(tree.find(1)).toEqual('one')
      expect(tree.find(2)).toEqual('two')
      expect(tree.find(3)).toEqual('three')
    })
  })
  describe('.leaveCount', () => {
    it('is 0 if empty', () => {
      expect(tree.leaveCount).toEqual(0)
    })
    it('counts the number of leaves in the tree', () => {
      tree.insert(1, 'one')
      tree.insert(2, 'two')
      tree.insert(3, 'three')
      expect(tree.leaveCount).toEqual(3)
    })
  })
  describe('.nodeCount', () => {
    it('is 0 if empty', () => {
      expect(tree.nodeCount).toEqual(0)
    })
    it('increases by one on the very first insert', () => {
      tree.insert(1, 'one')
      expect(tree.nodeCount).toEqual(1)
    })
    it('increases by two after every subsequent inserts', () => {
      tree.insert(1, 'one')
      tree.insert(2, 'two')
      expect(tree.nodeCount).toEqual(3)
      tree.insert(3, 'three')
      expect(tree.nodeCount).toEqual(5)
    })
  })
  describe('#delete', () => {
    beforeEach(() => {
      tree.insert(1, 'one')
      tree.insert(2, 'two')
      tree.insert(3, 'three')
      tree.insert(4, 'four')
      tree.insert(5, 'five')
      tree.insert(6, 'six')
      tree.insert(7, 'seven')
    })
    it('returns null is deletion failed (when tree is empty)', () => {
      tree = new LeafTree()
      expect(tree.delete(1)).toEqual(null)
    })
    it('returns null if deletion failed (when key does not exist in the tree)', () => {
      tree.insert(1, 'one')
      expect(tree.delete(10)).toEqual(null)
    })
    it('returns and removes the value associated with the deleted key', () => {
      expect(tree.delete(1)).toEqual('one')
      expect(tree.delete(1)).toEqual(null)
    })
    it('descreases leaveCount by 1', () => {
      const oldLeaveCount = tree.leaveCount
      tree.delete(4)
      expect(tree.leaveCount).toEqual(oldLeaveCount - 1)
    })
    it('descreases nodeCount by two', () => {
      const oldNodeCount = tree.nodeCount
      tree.delete(4)
      expect(tree.nodeCount).toEqual(oldNodeCount - 2)
    })
  })
  describe('#intervalFind', () => {
    function populateForIntervalTest(tree) {
      tree.insert(1, 'one')
      tree.insert(2, 'two')
      tree.insert(3, 'three')
      tree.insert(4, 'four')
      tree.insert(5, 'five')
      tree.insert(6, 'six')
      tree.insert(7, 'seven')
    }
    it('returns a type of linked list of the pointers in the interval', () => {
      const intervalValues = [[1, 'one'], [2, 'two'], [3, 'three'], [4, 'four']]
      populateForIntervalTest(tree)

      let interval = tree.intervalFind(1, 5)
      intervalValues.forEach(([key, val]) => {
        expect(interval.key).toEqual(key)
        expect(interval.value).toEqual(val)
        interval = interval.right
      })
    })
    it('returns null if there are no elements in the specified interval', () => {
      populateForIntervalTest(tree)
      expect(tree.intervalFind(8, 10)).toEqual(null)
    })
    it('excludes elements equal to the closing interval key', () => {
      populateForIntervalTest(tree)
      const interval = tree.intervalFind(1, 2)
      expect(interval.right).toEqual(null)
    })
  })
  xdescribe('LeafTree.makeTree')
  xdescribe('#toArray', () => {
    test('returns the elements in ascending key order', () => {
      it('works if elements are inserted in ascending order')
      it('works if elements are inserted in descending order')
      it('works if elements are inserted in random order')
    })
  })
  xdescribe('#fromList')
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
