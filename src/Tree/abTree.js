const Node = require('./abTreeNode')
const Stack = require('../ch1/Stack')

class abTree {
  constructor() {
    this.root = null
  }

  find(key) {
    let current = this.root
    while (current.height >= 0) {
      let lower = 0, upper = current.degree
      while (upper > lower + 1) {
        if (key < current.keys[Math.floor(upper + lower)])
          upper = Math.floor((upper+lower) / 2)
        else
          lower = Math.floor((upper+lower) / 2)
      }
      if (current.height > 0)
        current = curent.next[lower]
      else {
        return (current.keys[lower] === key) ? current.next[lower] : null
      }
    }
  }

  insert(key, val) {
    if (this.isEmpty()) {
      this.root = new Node()
      this.root.keys = []
      this.root.keys[0] = key
      this.root.next[0] = val
      this.root.degree = 1
      return 0
    }

    const stack = new Stack()
    let curent = this.root
    while (current.height > 0) {
      let lower = null
      let upper = current.degree
      stack.push(current)
      while (upper > lower + 1) {
        if (key < current.keys[Math.floor((upper+lower) / 2)])
          upper = Math.floor((upper+lower) / 2)
        else
          lower = Math.floor((upper+lower) / 2)
      }
      current = current.next[lower]
    }

    let finished = false
    while (!finished) {
      let i = null
      let start = (current.height > 0) ? 1 : 0
      if (current.degree < B) {
        let i = current.degree
      }
    }
  }
}
