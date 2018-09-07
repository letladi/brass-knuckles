const Node = require('./LeafTreeNode')

describe('LeafTreeNode', () => {
  let node = null
  describe('#isLeaf', () => {
    it('is true if the node is a leaf (node.right == null)', () => {
      const node = new Node(1, 'left')
      expect(node.isLeaf()).toEqual(true)
    })
    it('is false if the node is not a leaf', () => {
      const node2 = new Node(3, 'three')
      const node3 = new Node(4, 'four')
      const node = new Node(1, node2, node3)
      expect(node.isLeaf()).toEqual(false)
    })
  })
  describe('.value', () => {
    it('returns the value for the given key if the node is a leaf', () => {
      const dataVal = 'left'
      const node = new Node(1, dataVal)
      expect(node.value).toEqual(dataVal)
    })
    it('returns null if the node does not have a data value (is not a leaf)', () => {
      const node2 = new Node(3, 'three')
      const node3 = new Node(4, 'four')
      const node = new Node(1, node2, node3)
      expect(node.value).toEqual(null)
    })
  })
  describe('.left', () => {
    it('returns null if node is a leaf', () => {
      const node = new Node(1, 'one')
      expect(node.left).toEqual(null)
    })
    it('returns the left child', () => {
      const leftChild = new Node(1, 'one')
      const rightChild = new Node(2, 'two')
      const node = new Node(1, leftChild, rightChild)
      expect(node.left).toEqual(leftChild)
    })
  })
  describe('.left=', () => {
    it('resets the left node', () => {
      const node1 = new Node(2, 'two')
      const node2 = new Node(3, 'three')
      const node3 = new Node(4, 'four')
      const node = new Node(1, node1, node2)
      expect(node.left).toEqual(node1)
      node.left = node3
      expect(node.left).toEqual(node3)
    })
  })
  describe('.right', () => {
    it('returns null if the node is a leaf', () => {
      const node = new Node(1, 'two')
      expect(node.right).toEqual(null)
    })
    it('returns the right child', () => {
      const rightChild = new Node(1, 'one')
      const leftChild = new Node(3, 'two')
      const node = new Node(2, leftChild, rightChild)
      expect(node.right).toEqual(rightChild)
    })
  })
  xdescribe('.right=', () => {
    it('resets the right node', () => {
      const node1 = new Node(2, 'two')
      const node2 = new Node(3, 'three')
      const node3 = new Node(4, 'four')
      const node = new Node(1, node1, node2)
      expect(node.right).toEqual(node2)
      node.right = node3
      expect(node.right).toEqual(node3)
    })
    it('throws an exception if the new value is not a Node instance', () => {
      const node1 = new Node(2, 'two')
      const node2 = new Node(3, 'three')
      const node = new Node(1, node1, node2)
      expect(() => node.right = 'not-an-instance').toThrow(new Error(Node.prototype.messages.invalidAssignmentOfRightChild))
    })
    it('does not throw an exception if we assigning to null', () => {
      const node1 = new Node(2, 'two')
      const node2 = new Node(3, 'three')
      const node = new Node(1, node1, node2)
      expect(() => node.right = null).not.toThrow()
    })
  })
})
