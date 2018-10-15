const Node = require('./abTreeNode')
const Stack = require('../../ch1/Stack')
const binarySearch = require('../../util/binarySearch')
const { find, isOverflowing, navigateTree } = require('./util')
const { first, last, length } = require('../../util/index')

class abTree {
  constructor(a = 550, b = 2 * a + 1) {

    if (b < 2 * a) throw new Error(getConstructionExceptionMessage(a, b))
    this.root = new Node()
    this.a = a
    this.b = b

    this._count = 0
  }

  find(key) {
    const nodesOnNavigationPath = navigateTree(this.root, key)
    const { node } = nodesOnNavigationPath.top()
    const index = find(node.keys, key)
    return (node.keys[index] === key) ? node.next[index] : null
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
    }

    const nodesOnNavigationPath = navigateTree(this.root, key)
    const { node } = nodesOnNavigationPath.top()

    const index = find(node.keys, key)
    const keyExists = node.keys[index] === key
    if (keyExists) return false

    node.add(key, val)
    this._count++
    this.balance(nodesOnNavigationPath)
    return true
  }

  balance(stackedNodes) {
    const { b } = this
    while (!stackedNodes.isEmpty()) {
      let { node: current } = stackedNodes.pop()
      if (isOverflowing(current, b)) {
        const newNode = current.split()
        if (current === this.root) {
          this.root = new Node()
          this.root.height = this.root.height + 1
          this.root.add(first(current.keys), current)
          this.root.add(first(newNode.keys), newNode)
        } else {
          const { node: parent, index } = stackedNodes.pop()
          parent.keys[index] = first(current.keys)
          parent.next[index] = current
          parent.add(first(newNode.keys), newNode)
        }
      }
    }
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
