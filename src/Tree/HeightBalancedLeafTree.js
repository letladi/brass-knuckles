const LeafTree = require('./LeafTree')
const Node = require('./LeafTreeNode')
const Stack = require('../ch1/Stack')
const { height, rotateLeft, rotateRight, copyNode } = require('./treeUtils')

// TODO: Optimize storage/retrieval of height values
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
      this._balance(stack)
    }
    return true
  }

  _balance(stackedNodes) {
    let current = null
    while (!stackedNodes.isEmpty()) {
      current = stackedNodes.pop()
      const balanceFactor = height(current.left) - height(current.right)

      if (balanceFactor === 2) {
        if (height(current.left.left) - height(current.right) === 1) {
          rotateRight(current)
        } else {
          rotateLeft(current.left)
          rotateRight(current)
        }
      } else if (balanceFactor === -2) {
        if (height(current.right.right) - height(current.left) === 1) {
          rotateLeft(current)
        } else {
          rotateRight(current.right)
          rotateLeft(current)
        }
      }
    }
  }

  delete(key) {
    if (this.isEmpty()) return null
    else if (this.root.isLeaf()) {
      if (this.root.key === key) {
        const deleteVal = this.root.value
        this.root.left = null
        return deleteVal
      }
      return null
    } else {
      let current = this.root
      let currentParent = null
      let currentSibling = null
      const stack = new Stack()

      while (!current.isLeaf()) {
        stack.push(current)
        currentParent = current
        if (key < current.key) {
          current = currentParent.left
          currentSibling = currentParent.right
        } else {
          current = currentParent.right
          currentSibling = currentParent.left
        }
      }
      if (current.key !== key) return null
      else {
        copyNode(currentParent, currentSibling)
        /* currentParent is now a leaf so we remove it from the stack
           before balancing the nodes
        */
        stack.pop()
        this._balance(stack)
        return current.value
      }
    }
  }
}

module.exports = HeightBalancedLeafTree
