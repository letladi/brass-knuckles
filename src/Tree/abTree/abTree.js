const Node = require('./abTreeNode')
const Stack = require('../../ch1/Stack')
const binarySearch = require('../../util/binarySearch')
const { isOverflowing } = require('./util')
const { first, last } = require('../../util/index')

class abTree {
  constructor(a = 4000, b = 2 * a + 1) {

    if (b < 2 * a) throw new Error(getConstructionExceptionMessage(a, b))
    this.root = new Node()
    this.a = a
    this.b = b

    this._count = 0
  }

  find(key) {
    let current = this.root
    while (!current.isLeaf()) { // not at leaf
      const { index, found } = current.search(key)
      if (key === 100000) {
        console.log('\n\n\n')
        console.log('index:', index)
        console.log('current', current)
      }
      current = current.next[index]
    }
    // current is now a leaf node
    const { index, found } = current.search(key)
    return found ? current.next[index] : null
  }

  isEmpty() {
    return this.root.isEmpty()
  }

  get height() {
    return this.root.height
  }

  get size() {
    return this._count
  }

  insert(key, val) {
    if (this.isEmpty()) {
      this.root.add(key, val)
      this._count++
      return true
    } // insert into empty tree

    const stack = new Stack()
    let current = this.root
    while (!current.isLeaf()) { // not at leaf
      stack.push(current)
      const { index, found } = current.search(key)

      if (found) return false
      current = current.next[index]
    }
    // current is now a leaf node
    current.add(key, val)

    this._count++

    stack.push(current)
    this.balance(stack)
  }

  balance(stackedNodes) {
    const { a, b } = this
    let currentParent = null
    while (!stackedNodes.isEmpty()) {
      let current = stackedNodes.pop()
      if (isOverflowing(current, b)) {
        const rightNode = current.split()
        const leftNode = current
        if (current === this.root) {
          const prevHeight = this.root.height
          this.root = new Node()
          this.root.add(first(rightNode.keys), leftNode, rightNode)
          // this.root.next[this.root.degree] = rightNode

          this.root.height = prevHeight + 1
        } else {
          currentParent = stackedNodes.pop()
          currentParent.add(first(rightNode.keys), leftNode, rightNode)
          // currentParent.next[currentParent.degree] = rightNode
        }
      }
    }
  }

  insertOld(key, val) {
    if (this.isEmpty()) {
      this.root.add(key, val)
      return true
    } // insert into empty tree

    const stack = new Stack()
    let current = this.root
    while (!current.isLeaf()) { // not at leaf
      stack.push(current)
      const { index, found } = node.search(key)
      if (found) return false
      current = current.next[index - 1]
    }
    // current is now a leaf node

    const { a, b } = this
    let finished = false
    while (!finished) {
      let start = (current.height > 0) ? 1 : 0
      if (current.degree < b) { // node still has room
        current.add(key, val)
        finished = true
      } else { // node is full, we must split it
        const newNode = new Node()
        let insertDone = false
        let i = b - 1
        let j = Math.floor((b - 1) / 2)
        while (j >= 0) {
          if (insertDone || key < current.keys[i]) {
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
            current.keys[i + 1] = key
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
            newNode.add(current.keys[i], current.next[i])
          }
          newNode.height = current.height
          newNode.degree = current.degree
          current.height++
          current.degree = 2
          current.next[0] = newNode
          current.next[1] = insertPoint
          current.keys[1] = insertKey
          current.next.splice(2)
          current.keys.splice(2)
          finished = true
        } // end splitting root
      } // end node splitting
    } // end of rebalancing
    return true
  }

  delete(key) {
    let tempNode = null

    let i = null
    let j = null
    let current = this.root
    const nodeStack = new Stack()
    const indexStack = new Stack()

    while (current.height > 0) { // not a leaf
      let lower = 0
      let upper = current.degree
      const mid = Math.floor((upper + lower) / 2)
      while (upper > lower + 1) {
        if (key < current.keys[mid])
          upper = mid
        else
          lower = mid
      }
      indexStack.push(lower)
      nodeStack.push(current)
      current = current.next[lower]
    }
    // now current is leaf node from which to delete
    for (let i = 0; i < current.degree; i++)
      if (current.keys[i] === key) break

    if (i === current.degree) {
      return null // delete failed; key does not exists
    } else { // key exists, now delete from leaf node
      const deleteObj = current.next[i]
      current.degree -= 1
      while (i < current.degree) {
        current.next[i] = current.next[i + 1]
        current.keys[i] = current.key[i + 1]
        i++
      } // deleted from node, now rebalance
      let finished = false
      const { a, b } = this
      while (!finished) {
        if (current.degree >= a) {
          finished = true // node still full enough, can stop
        } else { // node became underfull
          if (nodeStack.isEmpty()) {
            // current is root
            if (current.degree >= 2) finished = true // root still necessary
            else if (current.height === 0) finished = true // deleting last keys from root
            else { // delete root, copy to keep address
              tempNode = current.next[0]
              for (let i = 0; i < tempNode.degree; i++) {
                current.next[i] = tempNode.next[i]
                current.keys[i] = tempNode.keys[i]
              }
              current.degree = tempNode.degree
              current.height = tempNode.height
              finished = true
            }
          } else { // done wit root
            // delete from non-root node
            let upper = nodeStack.pop()
            let curr = indexStack.pop()
            if (curr < upper.degree - 1) {
              // not last
              neighbor = upper.next[curr + 1]
              if (neighbor.degree > a) {
                // sharing possible
                i = current.degree
                if (current.height > 0) {
                  current.keys[i] = upper.keys[curr + 1]
                } else {
                  // on leaf level, take leaf key
                  current.keys[i] = neighbor.keys[0]
                  neighbor.keys[0] = neighbor.keys[1]
                }
                current.next[i] = neighbor.next[0]
                upper.keys[curr + 1] = neighbor.keys[1]
                neighbor.next[0] = neighbor.next[1]

                for (j = 2; j < neighbor.degree; j++) {
                  neighbor.next[j - 1] = neighbor.next[j]
                  neighbor.keys[j - 1] = neighbor.keys[j]
                }
                neighbor.degree -= 1
                current.degree += 1
                finished = true
              } else { // sharing complete
                // must join
                i = current.degree
                if (current.height > 0) curent.keys[i] = upper.keys[curr + 1]
                else { // on leaf level, take leaf key
                  current.keys[i] = neighbor.keys[0]
                }
                current.next[i] = neighbor.next[0]
                for (j = 1; j < neighbor.degree; j++) {
                  current.next[++i] = neighbor.next[j]
                  current.keys[i] = neighbor.keys[j]
                }
                current.degree = i + 1
                upper.degree -= 1
                i = curr + 1
                while (i < upper.degree) {
                  upper.next[i] = upper.next[i + 1]
                  upper.keys[i] = upper.keys[i + 1]
                  i += 1
                } // deleted from upper, now propagate up
                current = upper
              } // end of sharing/joining if-else
            } else {
              // current is last entry in upper
              neighbor = upper.next[curr - 1]
              if (neighbor.degree > a) {
                // sharing possible
                for (let j = current.degree; j > 1; j--) {
                  current.next[j] = current.next[j - 1]
                  current.keys[j] = current.keys[j - 1]
                }
                current.next[1] = current.next[0]
                i = neighbor.degree
                current.next[0] = neighbor.next[i - 1]
                if (current.height > 0) {
                  current.keys[1] = upper.keys[curr]
                } else {
                  // on leaf level, take leaf key
                  current.keys[1] = current.keys[0]
                  current.keys[0] = neighbor.keys[i - 1]
                }
                upper.keys[curr] = neighbor.keys[i - 1]
                neighbor.degree -= 1
                current.degree += 1
                finished = true
              } // sharing complete
              else {
                // must join
                i = neighbor.degree
                if (current.height > 0) neighbor.keys[i] = upper.keys[curr]
                else neighbor.keys[i] = current.keys[i] // on leaf level, take leaf key

                neighbor.next[i] = current.next[0]

                for (j = 1; j < current.degree; j++) {
                  neighbor.next[++i] = current.next[j]
                  neighbor.keys[i] = current.keys[j]
                }
                neighbor.degree = i + 1
                upper.degree -= 1
                // deleted from upper, now propagate up
                current = upper
              } // end share/joining if-else
            } // end of current is (not) last upper if-else
          } // end of delete root/non-root if-else
        } // end of full/underfull if-else
      } // end of while not finished
    }
    return deleteObj
  } // end of delete object exists if-else
}

abTree.prototype.messages = {
  bValueLessThanRequiredMinimum: 'The given b ({{b}}) is less than 2a (where a = {{a}})'
}

const getConstructionExceptionMessage = (a, b) => {
  let message = abTree.prototype.messages.bValueLessThanRequiredMinimum
  message = message.replace('{{a}}', a)
  message = message.replace('{{b}}', b)
  return message
}

module.exports = abTree
