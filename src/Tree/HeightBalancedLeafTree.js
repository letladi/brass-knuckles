const LeafTree = require('./LeafTree')
const Node = require('./LeafTreeNode')
const Stack = require('../ch1/Stack')
const { height, rotateLeft, rotateRight } = require('./treeUtils')

class HeightBalancedLeafTree extends LeafTree {
  insert(key, val) {
    let current = null

    if (this.isEmpty()) {
      this.root = new Node(key, val)
    } else {
      const stack = new Stack()
      current = this.root

      while (!current.isLeaf()) {
        stack.push(current)
        current = (key < current.key) ? current.left : current.right
      }

      if (current.key === key) return false
      else {
        let oldLeaf = new Node(current.key, current.value)
        let newLeaf = new Node(key, val)

        if (current.key < key) {
          current.left = oldLeaf
          current.right = newLeaf
          current.key = key
        } else {
          current.left = newLeaf
          current.right = oldLeaf
        }
      }

      // we now balance the tree; TODO; make insertion more efficient by storing height on the nodes instead of computing it each time
      let finished = false

      while (!stack.isEmpty() && !finished) {
        current = stack.pop()
        let oldHeight = height(current)

        if (height(current.left) - height(current.right) === 2) {
          if (height(current.left.left) - height(current.right) === 1) {
            rotateRight(current)
          } else {
            rotateLeft(current.left)
            rotateRight(current)
          }
        } else if (height(current.left) - height(current.right) === -2) {
          if (height(current.right.right) - height(current.left) === 1) {
            rotateLeft(current)
          } else {
            rotateRight(current.right)
            rotateLeft(current)
          }
        }
        if (height(current) === oldHeight) finished = true
      }
    }
    return true
  }
}
