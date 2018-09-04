const assert = require('assert')
const Node = require('./Node')
const { isNull } = require('../util/')

class LeafTree {
  constructor() {
    this.root = new Node()
  }

  isEmpty() {
    return isNull(this.root.left)
  }

  rotateLeft(node) {
    assert(node.isLeaf() === false, 'can only perform left rotation on interior error')
    assert(node.right.isLeaf() === false, 'can only perform left rotation if node.right is interior node')
    const temp = node.left
    const tempKey = node.key
    node.left = node.right
    node.key = node.right.key
    node.right = node.left.right
    node.left.left = temp
    node.left.key = tempKey

  }
}
