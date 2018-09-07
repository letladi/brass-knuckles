const { isNull } = require('../util/')

class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key
    this.left = left
    this.right = right
  }

  isLeaf() {
    return isNull(this._right)
  }

  get left() {
    return this.isLeaf() ? null : this._left
  }

  set left(val) {
    this._left = val
  }

  get value() {
    return this.isLeaf() ? this._left : null
  }

  get right() {
    return this._right
  }

  set right(val) {
    if ((val instanceof Node) || isNull(val))
      this._right = val
    else
      throw new Error(Node.prototype.messages.invalidAssignmentOfRightChild)
  }

  isEmpty() {
    return isNull(this._left)
  }
}

Node.prototype.messages = {
  invalidAssignmentOfRightChild: '.right= must assign another node object'
}

module.exports = Node
