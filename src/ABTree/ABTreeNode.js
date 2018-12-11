const binarySearch = require('../util/binarySearch')
const { first } = require('../util/')

function find(list, key) {
  let lo = 0, hi = list.length
  while (hi > lo + 1) {
    const mid = Math.floor((hi + lo) / 2)
    if (key < list[mid])
      hi = mid
    else
      lo = mid
  }
  return lo
}

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

  add(key, val) {
    let i = this.keys.length
    while (this.keys[i - 1] && key < this.keys[i - 1]) {
      this.keys[i] = this.keys[i - 1]
      this.next[i] = this.next[i - 1]
      i--
    }
    this.keys[i] = key
    this.next[i] = val
  }

  delete(key) {
    const keys = this.keys
    const values = this.next
    const i = find(this.keys, key)
    if (this.keys[i] === key) {
      keys.splice(i, 1)
      const valList = values.splice(i, 1 )
      return first(valList)
    }
    return null
  }

  get degree() {
    return this.next.length
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

  concat(other) {
    this.keys = this.keys.concat(other.keys)
    this.next = this.next.concat(other.next)
  }
}

module.exports = Node
