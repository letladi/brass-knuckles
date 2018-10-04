const binarySearch = require('../../util/binarySearch')

class Node {
  constructor() {
    this.reset()
    this.comparator = (a, b) => (a < b) ? -1 : 1
  }

  reset() {
    this.height = 0
    this.keys = []
    this.next = []
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

  search(key) {
    const index = binarySearch(this.keys, key)
    return { index, found: this.keys[index] === key }
  }

  split() {
    const half = Math.floor((this.degree + 1) / 2)
    const right = new Node()
    right.height = this.height
    right.keys = this.keys.splice(half)
    right.next = this.next.splice(half)
    return right
  }
}

module.exports = Node
