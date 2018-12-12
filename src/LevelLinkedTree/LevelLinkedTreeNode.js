const LeafTreeNode = require('../LeafTree/LeafTreeNode')

class Node extends LeafTreeNode {
  constructor(key = null, left = null, right = null) {
    super(key, left, right)
    this.levelRight = null
    this.levelLeft = null
    this.parent = null
  }

  linkLeft(node) {
    this.levelLeft = node
    node.levelRight = this
  }

  linkRight(node) {
    this.levelRight = node
    node.levelLeft = this
  }

  linkParent(node) {
    this.parent = node
  }

  unlinkParent() {
    this.parent = null
  }

  unlinkLeft() {
    this.levelLeft.levelRight = null
    this.levelLeft = null
  }

  unlinkRight() {
    this.levelRight.levelLeft = null
    this.levelRight = null
  }

  unlinkFromLevel() {
    this.unlinkLeft()
    this.unlinkRight()
  }
}

module.exports = Node
