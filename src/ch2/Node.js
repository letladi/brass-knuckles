const { isNull } = require('../util/')
const assert = require('assert')

class Node {
  constructor() {
    this.key = null
    this.left = null
    this.right = null
  }

  isLeaf() {
    return isNull(this.right)
  }

  data() {
    assert(this.isLeaf(), this.messages.leafNodeError)
    return this.left
  }

  set left(newLeft) {
    assert(newLeft.key < this.key, this.messages.leftNodeError)
    this.left = newLeft
  }

  set right(newRight) {
    assert(newRight >= this.key, this.messages.rightNodeError)
    this.right = newRight
  }

  set data(newData) {
    assert(this.isLeaf(), this.messages.leafNodeError)
    this.left = newData
  }
}

Node.prototype.messages = {
  leafNodeError: 'Interior nodes do not contain any data',
  leftNodeError: "left node key must be less than it's parent node's key",
  rightNodeError: "right node key must be greater than or equal to it's parent node's key"
}
