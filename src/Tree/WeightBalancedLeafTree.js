const LeafTree = require('./LeafTree')
const Node = require('./LeafTreeNode')
const Stack = require('../ch1/Stack')
const { weight, rotateLeft, rotateRight } = require('./treeUtils')

class WeightBalancedLeafTree extends LeafTree {
  constructor(alpha = 0.288, epsilon = 0.005) {
    super()
    this.alpha = 0.288
    this.epsilon = 0.005
  }
  insert(key, val) {
    if (this.isEmpty()) {
      this.root = new Node(key, val)
    } else {
      const stack = new Stack()
      let current = this.root
      while (!current.isLeaf()) {
        stack.push(current)
        current = (current.key > key) ? current.left : current.right
      }

      if (current.key === key) return false

      const oldLeaf = new Node(current.key, current.value)
      const newLeaf = new Node(key, val)
      if (current.key < key) {
        current.left = oldLeaf
        current.right = newLeaf
        current.key = key
      } else {
        current.left = newLeaf
        current.right = oldLeaf
      }

      const { alpha, epsilon } = this
      while (!stack.isEmpty()) {
        current = stack.pop()
        if (weight(current.right) < alpha * weight(current)) {
          if (weight(current.left.left) > (alpha + epsilon) * weight(current)) {
            rotateRight(current)
          } else {
            rotateLeft(current.left)
            rotateRight(current)
          }
        } else if (weight(current.left) < alpha * weight(current)) {
          if (weight(current.right.right) > (alpha + epsilon) * weight(current)) {
            rotateLeft(current)
          } else {
            rotateRight(current.right)
            rotateLeft(current)
          }
        }
      }
    }
    return true
  }
}
