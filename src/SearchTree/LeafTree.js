const assert = require('assert')
const Stack = require('../ch1/Stack')
const Node = require('./LeafTreeNode')
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
    return this.root.isEmpty()
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
    while (!current.isLeaf()) {
      current = (key < current.key) ? current.left : current.right
    }
    return (current.key === key) ? current.value : null
  }

  insert(key, val) {
    if (this.isEmpty()) this.root = new Node(key, val)
    else {
      let current = this.root
      while (!current.isLeaf()) {
        current = (key < current.key) ? current.left : current.right
      }
      if (current.key === key)
        return false
      else {
        let oldLeaf = new Node(current.key, current.value)
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
    else if (this.root.isLeaf()) {
      if (this.root.key === key) {
        const deleteVal = this.root.value
        this.root.left = null
        return deleteVal
      } else
        return null
    } else {
      let current = this.root
      let currentParent = null
      let currentSibling = null

      while (!current.isLeaf()) {
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
        return current.value
      }
    }
  }

  traverse(cb) {
    let current = this.root
    const stack = new Stack()

    while (current || !stack.isEmpty()) {
      if (current) {
        stack.push(current)
        current = current.left
      } else {
        current = stack.pop()
        cb(current)
        current = current.right
      }
    }
  }

  get leaveCount() {
    let count = 0
    if (this.isEmpty()) return count

    this.traverse((node) => count += node.isLeaf() ? 1 : 0)
    return count
  }

  get nodeCount() {
    let count = 0
    if (this.isEmpty()) return count

    this.traverse(() => count++)
    return count
  }

  _heightHelper(node = this.root) {
    if (isNull(node)) return -1
    return 1 + Math.max(this._heightHelper(node.left), this._heightHelper(node.right))
  }

  get height() {
    return this._heightHelper(this.root)
  }

  get interiorNodeCount() {
    let count = 0
    if (this.isEmpty()) return count
    this.traverse((node) => count += node.isLeaf() ? 0 : 1)
    return count
  }

  intervalFind(a, b) {
    let resultList = null
    const stack = new Stack()
    stack.push(this.root)

    while (!stack.isEmpty()) {
      const current = stack.pop()
      if (current.isLeaf()) {
        if (a <= current.key && current.key < b) {
          const temp = new Node(current.key, current.value, resultList)
          resultList = temp
        }
      } else if (b <= current.key) {
        stack.push(current.left)
      } else if (current.key <= a) {
        stack.push(current.right)
      } else {
        stack.push(current.left)
        stack.push(current.right)
      }
    }
    return resultList
  }
}

module.exports = LeafTree
