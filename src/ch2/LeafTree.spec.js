const assert = require('assert')
const LeafTree = require('./LeafTree')
const Node = require('./Node')

describe('LeafTree', () => {
  describe('rotateLeft()', () => {
    it('only performs rotation on interior node')
    it('only performs rotation if node.right is an interior node')
    it('maintains valid key order relation')
  })
  describe('rotateRight()', () => {
    it('only performs rotation on interior node')
    it('only performs rotation if node.left is an interior node')
    it('maintains valid key order relation')
  })
  describe('#height', () => {
    it('should be >= Math.ceil(log n)')
    it('should be <= n - 1')
    it('returns the maximum height of the tree')
  })
  describe('#depth', () => {
    it('should be >= log n')
    it('should be <= (n - 1)(n + 2) / 2n (approx. 0.5n)')
  })
  describe('#find', () => {
    it('returns null if the tree is empty')
    it('returns null if the a value associated with the query key is not in the tree')
    it('returns the value associated with the query key if it exists in the tree')
  })
  describe('#insert', () => {
    it('returns false if we attempt to insert a key that already exists in the tree')
    it('returns true if insertion succeeded')
    it('should be able to insert in empty tree')
    it('should be able to insert in tree with existing node')
    it('increases the leaveCount of the tree')
  })
  describe('#delete', () => {
    it('returns null is deletion failed (like when tree is empty)')
    it('returns the value associated with the deleted key')
  })
})
