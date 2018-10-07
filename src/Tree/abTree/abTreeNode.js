const binarySearch = require('../../util/binarySearch')

class Node {
  constructor() {
    this.reset()
  }

  reset() {
    this.height = 0
    this.keys = []
    this.next = []
  }

  isLeaf() {
    return this.height === 0
  }

  add(key, val1, val2) {
    const { index, found } = this.search(key)
    this.keys.splice(index, 0, key)

    if (val2) {
      this.next.splice(index, 0, val1, val2)
    } else {
      this.next.splice(index, 0, val1)
    }
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
