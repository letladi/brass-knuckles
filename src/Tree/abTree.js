const Node = require('./abTreeNode')
const Stack = require('../ch1/Stack')

class abTree {
  constructor(a, b) {
    this.root = null
    this.a = a
    this.b = b
  }

  find(key) {
    let current = this.root
    while (current.height >= 0) {
      let lower = 0, upper = current.degree
      while (upper > lower + 1) {
        const mid = Math.floor((upper + lower) / 2)
        if (key < current.keys[midIndex])
          upper = mid
        else
          lower = mid
      }
      if (current.height > 0)
        current = curent.next[lower]
      else {
        return (current.keys[lower] === key) ? current.next[lower] : null
      }
    }
  }

  isEmpty() {
    return this.root.height === 0 && this.root.degree === 0
  }

  insert(key, val) {
    if (this.isEmpty()) {
      this.root = new Node()
      this.root.keys[0] = key
      this.root.next[0] = val
      this.root.degree = 1
      return true
    } // insert into empty tree

    const stack = new Stack()
    let curent = this.root
    while (current.height > 0) {
      let lower = 0
      let upper = current.degree
      stack.push(current)
      while (upper > lower + 1) {
        const mid = Math.floor((upper+lower) / 2)
        if (key < current.keys[mid])
          upper = mid
        else
          lower = mid
      }
      current = current.next[lower]
    }
    // current is now a leaf node

    const { a, b } = this
    let finished = false
    while (!finished) {
      let start = (current.height > 0) ? 1 : 0
      if (current.degree < b) { // node still has room
        let i = current.degree
        while (i > start && current.keys[i - 1] > key) {
          current.keys[i] = current.keys[i - 1]
          current.next[i] = current.next[i - 1]
          i--
        }
        current.keys[i] = key
        current.next[i] = val
        current.degree++
        finished = true
      } else { // node is full, we must split it
        const newNode = new Node()
        let insertDone = false
        let i = b - 1
        let j = Math.floor((b - 1) / 2)
        while (j >= 0) {
          if (insertDone || key < current.key[i]) {
            newNode.next[j] = current.next[i]
            newNode.keys[j--] = current.keys[i--]
          } else {
            newNode.next[j] = val
            newNode.keys[j--] = key
            insertDone = true
          }
        } // upper half done, insert in lower half, if necessary
        while (!insertDone) {
          if (key < current.keys[i] && i >= start) {
            current.next[i + 1] = current.next[i]
            current.keys[i + 1] = current.keys[i]
            i--
          } else {
            current.next[i + 1] = val
            curent.keys[i + 1] = key
            insertDone = true
          }
        } // finished insertion
        current.degree = b + 1 - Math.floor((b + 1) / 2)
        newNode.degree = Math.floor((b + 1) / 2)
        newNode.height = current.height
        // split nodes complete, now insert the new node above
        const insertPoint = newNode
        const insertKey = newNode.keys[0]
        if (!stack.isEmpty()) { // not at root; move one level up
          current = stack.pop()
        } else { // splitting root: needs copy to keep root address
          const newNode = new Node()
          for (let i = 0; i < current.degree; i++) {
            newNode.next[i] = current.next[i]
            newNode.keys[i] = current.keys[i]
          }
          newNode.height = current.height
          newNode.degree = current.degree
          current.height++
          current.degree = 2
          current.next[0] = newNode
          current.next[1] = insertPoint
          current.keys[1] = insertKey
          finished = true
        } // end splitting root
      } // end node splitting
    } // end of rebalancing
    return true
  }

  delete(key) {
  }
}
