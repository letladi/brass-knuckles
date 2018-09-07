const assert = require('assert')
const LeafTree = require('./LeafTree')

xdescribe('LeafTree', () => {
  let tree = null
  beforeEach(() => tree = new LeafTree())

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
  xdescribe('#height', () => {
    it('should be >= Math.ceil(log n)')
    it('should be <= n - 1')
    it('returns the maximum height of the tree')
  })
  xdescribe('#depth', () => {
    it('should be >= log n')
    it('should be <= (n - 1)(n + 2) / 2n (approx. 0.5n)')
  })
  xdescribe('#find', () => {
    it('returns null if the tree is empty')
    it('returns null if the a value associated with the query key is not in the tree')
    it('returns the value associated with the query key if it exists in the tree')
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
    it('increases the leaveCount of the tree', () => {
      tree.insert(1, 'one')
      tree.insert(2, 'two')
      tree.insert(3, 'three')
      expect(tree.leaveCount).toEqual(3)
    })
    it('increases the nodeCount of the tree by one on the first insert', () => {
      tree.insert(1, 'one')
      expect(tree.nodeCount).toEqual(1)
    })
    it('increases the nodeCount by two on subsequent inserts', () => {
      tree.insert(1, 'one')
      const prevCount = tree.nodeCount
      tree.insert(2, 'two')
      expect(tree.nodeCount).toEqual(prevCount + 2)
    })
  })
  describe('.leaveCount', () => {
    it('an empty tree will have 0 leaves')
    it('counts the number of leaves in the tree')
  })
  xdescribe('#delete', () => {
    it('returns null is deletion failed (like when tree is empty)')
    it('returns the value associated with the deleted key')
  })
})
