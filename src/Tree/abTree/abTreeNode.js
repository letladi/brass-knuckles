class Node {
  constructor(key, val) {
    key ? this.resetWithValue(key, val) : this.reset()
    this.comparator = (a, b) => (a < b) ? -1 : 1
  }

  reset() {
    this.height = 0
    this.keys = []
    this.next = []
  }

  resetWithValue(key, val) {
    this.reset()
    this.keys[0] = key
    this.next[0] = val
  }

  isLeaf() {
    return this.height === 0
  }

  compare(key1, key2) {
    return this.comparator(key1, key2)
  }

  add(key, val) {
    let i = this.keys.length
    while (i > 0 && this.compare(key, this.keys[i - 1]) === -1) {
      this.keys[i] = this.keys[i - 1]
      this.next[i] = this.next[i - 1]
      i--
    }
    this.keys[i] = key
    this.next[i] = val
  }

  get degree() {
    return this.keys.length
  }

  isEmpty() {
    return this.degree === 0
  }
}

module.exports = Node
