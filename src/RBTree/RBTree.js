const LeafTree = require('../LeafTree/LeafTree')
const Node = require('./RBTreeNode')
const {
  height,
  swapKeys,
  copyNode,
  rotateRight,
  rotateLeft,
} = require('../util/treeUtils')

class RBTree extends LeafTree {
  constructor() {
    super()
    this.root.turnBlack()
  }

  createNode(key, left, right) {
    return new Node(key, left, right)
  }

  balance(stackedNodes) {
    if (stackedNodes.isEmpty()) return

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

  add(key, val) {
    if (this.isEmpty()) {
      this.root = this.createNode(key, val)
      this.root.turnBlack()
    } else {
      let current = this.root
      let parent = null
      let sibling = null

      while (!current.isLeaf()) {
        sibling = key < current.key ? current.left : current.right
        if (current.isBlack()) {
          if (current.left.isBlack() || current.right.isBlack()) {
            parent = current
            current = sibling
          } else { // current.left and current.right are red. Rebalancing needed
            if (parent === null) { // current is root
              current.left.turnBlack()
              current.right.turnBlack()
              parent = current
            } else if (current.key < parent.key) { // current left of parent
              if (current === parent.left) {
                current.left.turnBlack()
                current.right.turnBlack()
                current.turnRed()
              } else if (current === parent.left.left) {
                rotateRight(parent)
                parent.left.turnRed()
                parent.right.turnRed()
                parent.left.left.turnBlack()
                parent.left.right.turnBlack()
              } else { // current == parent.left.right
                rotateLeft(parent.left)
                rotateRight(parent)
                parent.left.turnRed()
                parent.right.turnRed()
                parent.right.left.turnBlack()
                parent.left.right.turnBlack()
              }
            } else { // current.key >= parent.key. Current is right of parent
              if (current === parent.right) {
                current.left.turnBlack()
                current.right.turnBlack()
                current.turnRed()
              } else if (current === parent.right.right) {
                rotateLeft(parent)
                parent.left.turnRed()
                parent.right.turnRed()
                parent.right.left.turnBlack()
                parent.right.right.turnBlack()
              } else { // current == parent.right.left
                rotateRight(parent.right)
                rotateLeft(parent)
                parent.left.turnRed()
                parent.right.turnRed()
                parent.right.left.turnBlack()
                parent.left.right.turnBlack()
              }
            } // end rebalancing
            current = sibling
            parent = current
            // two black lower neighbors
          }
        } else { // current is red
          current = sibling // move down
        }
      } // end while; reached leaf. always arrive on black leaf
      // found candidate leaf. Test whether key is distinct
      if (current.key === key) return false

      const oldLeaf = this.createNode(current.key, current.value)
      oldLeaf.turnRed()
      const newLeaf = this.createNode(key, val)
      newLeaf.turnRed()
      if (current.key < key) {
        current.left = oldLeaf
        current.right = newLeaf
        current.key = key
      } else {
        current.left = newLeaf
        current.right = oldLeaf
      }
    }
    return true
  }

  remove(key) {
    if (this.isEmpty()) return null
    else if (this.root.isLeaf()) {
      if (this.root.key === key) {
        const deleteVal = this.root.value
        this.root.left = null
        this.root.turnBlack()
        return deleteVal
      }
      return null
    } else {
      let current = this.root
      let parent = null
      let sibling = null

      // while (!current.isLeaf()) {
      //   // handle case 1
      //   if (current.left.isRed() || current.right.isRed()) {
      //     parent = current
      //     sibling = key < current.key ? current.left : current.right
      //   } else if (current.left.isBlack() && current.right.isBlack() && current.key < parent.key) {
      //
      //   }
        // handle case 2
        // handle case 3
      }
    }

}

module.exports = RBTree

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
