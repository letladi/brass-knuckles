class Node {
  constructor(key, val) {
    key ? this.resetWithValue(key, val) : this.reset()
  }

  reset() {
    this.height = 0
    this.degree = 0
    this.keys = []
    this.next = []
  }

  resetWithValue(key, val) {
    this.reset()
    this.keys[0] = key
    this.next[0] = val
    this.degree = 1
  }

  isLeaf() {
    return this.height === 0
  }
}

module.exports = Node
