const { isNull } = require('../util/')

class Node {
  constructor(key, value, left, right) {
    this.key = key
    this.value = value
    this.left = left
    this.right = right
  }

  isLeaf() {
    return isNull(this.right)
  }
}
