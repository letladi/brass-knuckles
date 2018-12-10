class Node {
  constructor(key = null, left = null, right = null, levelLeft = null, levelRight = null) {
    this.key = key
    this.left = left
    this.right = right
    this.levelLeft = levelLeft
    this.levelRight = levelRight
  }
}

module.exports = Node
