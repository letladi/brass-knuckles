const LeafTree = require('../LeafTree')
const Node = require('./rbTreeNode')
const {
  height,
  swapKeys,
  copyNode,
  rotateRight,
  rotateLeft,
} = require('../treeUtils')

class rbTree extends LeafTree {
  constructor() {
    super()
    this.root.turnBlack()
  }

  createNode(key, left, right) {
    return new Node(key, left, right)
  }

  balance(stackedNodes) {
    let current = stackedNodes.pop()
    let finished = false
    while (!stackedNodes.isEmpty() && !finished) {
      const parent = stackedNodes.pop()
      if (childrenHaveSameColor(parent)) { // both red, and parent black
        parent.left.turnBlack()
        parent.right.turnBlack()
        parent.turnRed()
      } else { // current is red, sibling black
        if (isSameNode(parent.left, current)) {
          const sibling = parent.right
          if (current.right.isBlack()) {
            rotateRight(parent)
            parent.right.turnRed()
            parent.turnBlack()
            finished = true
          } else { // current.right.color === red
            rotateLeft(current)
            rotateRight(parent)
            parent.right.turnBlack()
            parent.left.turnBlack()
            parent.turnRed()
          }
        } else { // current === parent.right
          const sibling = parent.left
          if (current.left.isBlack()) {
            rotateLeft(parent)
            parent.left.turnRed()
            parent.turnBlack()
            finished = true
          } else { // current.left.color == red
            rotateRight(current)
            rotateLeft(parent)
            parent.right.turnBlack()
            parent.left.turnBlack()
            parent.turnRed()
          }
        } // end current left/right of parent
        current = parent
      } // end sibling red/black
      if  (!finished && !stackedNodes.isEmpty()) { // parent is red, conflict possibly propagates upward
        current = stackedNodes.pop()
        if (current.isBlack()) finished = true // no conflict above
        // else current is parent node of red-red conflict
      }
    }
    this.root.turnBlack() // root is always black
    stackedNodes.clear()
  }
}

module.exports = rbTree

function haveSameColor(node1, node2) {
  return (node1.isRed() && node2.isRed()) ||
    (node1.isBlack() && node2.isBlack())
}

function isSameNode(node1, node2) {
  return node1 === node2
}

function childrenHaveSameColor(node) {
  return haveSameColor(node.left, node.right)
}
