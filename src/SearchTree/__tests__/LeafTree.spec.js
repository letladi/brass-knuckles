const assert = require('assert')
const LeafTree = require('../LeafTree')

function range(start, end, includeEnd = true) {
  const ret = []
  for (i = start, max = (includeEnd) ? end + 1 : end; i < max; i++) {
    ret.push([i, i * 2])
  }
  return ret
}

function populate(tree, numElements) {
  range(1, numElements).forEach(([key, val]) => tree.insert(key, val))
}

describe('LeafTree', () => {
  let tree = null
  beforeEach(() => tree = new LeafTree())

  describe('tree properties', () => {
    test('if height = h; leaveCount <= 2**h', () => {
      populate(tree, 20)
      const height = tree.height
      expect(tree.leaveCount).toBeLessThanOrEqual(2**height)
    })
    test('if height = h; leaveCount >= h + 1', () => {
      populate(tree, 20)
      const height = tree.height
      expect(tree.leaveCount).toBeGreaterThanOrEqual(height + 1)
    })
    test('if interiorNodeCount = h; leaveCount = h + 1', () => {
      populate(tree, 20)
      expect(tree.interiorNodeCount).toEqual(tree.leaveCount - 1)
    })
  })

  xdescribe('rotateLeft()', () => {
    it('only performs rotation on interior node')
    it('only performs rotation if node.right is an interior node')
    it('maintains valid key order relation')
  })
  xdescribe('rotateRight()', () => {
    it('only performs rotation on interior node')
    it('only performs rotation if node.left is an interior node')
    it('maintains valid key order relation')
  })
  describe('#height', () => {
    it('should be >= Math.ceil(log n)', () => {
      populate(tree, 25)
      const logN = Math.log2(tree.nodeCount)
      expect(tree.height).toBeGreaterThanOrEqual(Math.ceil(logN))
    })
    it('should be <= n - 1', () => {
      populate(tree, 25)
      const n = tree.nodeCount
      expect(tree.height).toBeLessThanOrEqual(n - 1)
    })
  })
  xdescribe('#averageDepth (of the leaves)', () => {
    it('should be >= log n')
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
    it('all the key value pairs inserted will exist in the tree (bug-fix where subsequent inserts over-writes previous ones)', () => {
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
    it('counts total number of nodes in the leaves', () => {
      tree.insert(1, 'one')
      tree.insert(2, 'two')
      expect(tree.nodeCount).toEqual(3)
    })
  })
  describe('#delete', () => {
    it('returns null is deletion failed (when tree is empty)', () => {
      expect(tree.delete(1)).toEqual(null)
    })
    it('returns null if deletion failed (when key does not exist in the tree)', () => {
      tree.insert(1, 'one')
      expect(tree.delete(2)).toEqual(null)
    })
    it('returns and removes the value associated with the deleted key', () => {
      tree.insert(1, 'one')
      expect(tree.delete(1)).toEqual('one')
      expect(tree.delete(1)).toEqual(null)
    })
  })
  xdescribe('#intervalFind', () => {
    it('returns an array [[key, val]] which contains an array')
    it('returns null if there are no elements in the specified interval')
    it('excludes elements equal to the closing interval key')
  })
})
