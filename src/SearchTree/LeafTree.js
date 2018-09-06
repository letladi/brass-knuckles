const assert = require('assert')
const Node = require('./Node')
const { isNull } = require('../util/')

const assertLeftRotationConditions = (node) => {
  assert(!node.isLeaf(), 'can only perform left rotation on interior error')
  assert(!node.right.isLeaf(), 'can only perform left rotation if node.right is interior node')
}

const assertRightRotationConditions = node => {
  assert(!node.isLeaf(), 'can only perform left rotation on interior error')
  assert(!node.left.isLeaf(), 'can only perform left rotation if node.right is interior node')
}

const swapKeys = (node1, node2) => {
  const tempKey = node1.key
  node1.key = node2.key
  node2.key = tempKey
}

const isLeaf = () => {
  return isNull(this.right)
}

const copyNode = (target, source) => {
  target.key = source.key
  target.left = source.left
  target.right = source.right
  return target
}

class LeafTree {
  constructor() {
    this.root = new Node()
  }

  isEmpty() {
    return isNull(this.root.left)
  }
  
  rotateLeft(node) {
    assertLeftRotationConditions(node)

    swapKeys(node, node.right)
    const temp = node.left

    node.left = node.right
    node.right = node.right.right

    node.left.right = node.left.left
    node.left.left = temp

    return node
  }

  rotateRight(node) {
    assertRightRotationConditions(node)

    swapKeys(node, node.left)
    const temp = node.right

    node.right = node.left
    node.left = node.left.left

    node.right.left = node.right.right
    node.right.right = temp

    return node
  }

  find(key) {
    if (this.isEmpty()) return null
    let current = this.root
    while (!isLeaf(current)) {
      current = (key < current.key) ? current.left : current.right
    }
    return (current.key === key) ? current.left : null
  }

  insert(key, val) {
    if (this.isEmpty()) this.root = new Node(key, val)
    else {
      let current = this.root
      while (!isLeaf(current)) {
        current = (key < current.key) ? current.left : current.right
      }
      /* duplicates keys not allowed */
      if (current.key === key)
        return false
      else {
        let oldLeaf = new Node(current.key, current.left)
        const newLeaf = new Node(key, val)
        if (current.key < key) {
          current.left = oldLeaf
          current.right = newLeaf
          current.key = key
        } else {
          current.left = newLeaf
          current.right = oldLeaf
        }
      }
    }
    return true
  }

  delete(key) {
    if (this.isEmpty())
      return null
    else if (isLeaf(this.root)) {
      if (this.root.key === key) {
        const deleteVal = this.root.left
        this.root.left = null
        return deleteVal
      } else
        return null
    } else {
      let current = this.root
      let currentParent = null
      let currentSibling = null

      while (!isLeaf(current)) {
        currentParent = current
        if (key < current.key) {
          current = currentParent.left
          currentSibling = currentParent.right
        } else {
          current = currentParent.right
          currentSibling = currentParent.left
        }
      }
      if (current.key !== key)
        return null
      else {
        copyNode(currentParent, currentSibling)
        return current.left
      }
    }
  }
}
