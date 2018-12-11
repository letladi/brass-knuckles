const LeafTreeNode = require('../LeafTreeNode')

class Node {
  constructor(key = null, left = null, right = null, levelLeft = null, levelRight = null) {
    this.key = key
    this.left = left
    this.right = right
    this.levelLeft = levelLeft
    this.levelRight = levelRight
  }

  linkLeft(node) {
    this.levelLeft = node
  }

  linkRight(node) {
    this.levelRight = node
  }

  unLinkLeft() {
    this.levelLeft = null
  }

  unLinkRight() {
    this.levelRight = null
  }
}

module.exports = Node
