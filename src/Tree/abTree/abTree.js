const Node = require('./abTreeNode')
const Stack = require('../../Stack/Stack')
const binarySearch = require('../../util/binarySearch')
const { find, isOverflowing, isUnderflowing, navigateTree } = require('./util')
const { first, last, length } = require('../../util/index')

function isAlmostUnderfull(node, min) {
  return (node.degree - 1) === min
}

class abTree {
  constructor(a = 550, b = 2 * a + 1) {

    if (b < 2 * a) throw new Error(getConstructionExceptionMessage(a, b))
    this.root = new Node()
    this.a = a
    this.b = b
    this._leaveCount = 0
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
      this._leaveCount++
      return true
    }

    const nodesOnNavigationPath = navigateTree(this.root, key)
    const { node } = nodesOnNavigationPath.top()

    const index = find(node.keys, key)
    const keyExists = node.keys[index] === key
    if (keyExists) return false

    node.add(key, val)
    this._count++
    this.balanceAfterInsertion(nodesOnNavigationPath)
    return true
  }

  balanceAfterInsertion(stackedNodes) {
    const { b } = this
    while (!stackedNodes.isEmpty()) {
      let { node: current } = stackedNodes.pop()
      if (isOverflowing(current, b)) {
        if (current.isLeaf()) this._leaveCount++
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

  get leaveCount() {
    return this._leaveCount
  }

  traverse(cb) {
    traversalHelper(this.root, cb)
  }

  delete(key) {
    if (this.isEmpty()) return null

    const nodesOnNavigationPath = navigateTree(this.root, key)
    const { node } = nodesOnNavigationPath.top()

    const value = node.delete(key)
    if (value) {
      this._count--
      this.balanceAfterDeletion(nodesOnNavigationPath)
      return value
    }
    return null
  }

  balanceAfterDeletion(stackedNodes) {
    const { a } = this
    while (!stackedNodes.isEmpty()) {
      const { node: current } = stackedNodes.pop()

      if (current === this.root) {
        if (current.degree === 1) {
          this.root = first(current.next)
          this._height--
        }
      } else {
        if (isUnderflowing(current, a)) {
         const { node: parent, index } = stackedNodes.pop()
         const prevNode = parent.next[index - 1]
         if (prevNode) {
           if (isAlmostUnderfull(prevNode, a)) {
             if (current.isLeaf()) this._leaveCount--
             prevNode.concat(current)
             parent.delete(parent.keys[index])
           } else {
             const lastKeyInPreviousNode = prevNode.pop()
             const lastValueInPreviousNode = prevNode.pop()
             parent.keys[index] = lastKeyInPreviousNode
             current.add(lastKeyInPreviousNode, lastValueInPreviousNode)
           }
         } else {
           const nextNode = parent.next[index + 1]
           if (isAlmostUnderfull(nextNode, a)) {
             if (current.isLeaf()) this._leaveCount--
             current.concat(nextNode)
             parent.delete(parent.keys[index + 1])
           } else {

             const firstKeyInNextNode = nextNode.keys.shift()
             const firstValueInNextNode = nextNode.next.shift()
             parent.keys[index + 1] = first(nextNode.keys)
             current.add(firstKeyInNextNode, firstValueInNextNode)
           }
         }
       }
      }
    }
  }
}

abTree.prototype.messages = {
  bValueLessThanRequiredMinimum: 'The given b ({{b}}) is less than 2a (where a = {{a}})'
}

function traversalHelper(node, cb) {
  if (node) {
    const isLeaf = node.isLeaf()
    for (let i = 0, len = node.degree; i < len; i++) {
      isLeaf ? cb(node.keys[i], node.next[i]) : traversalHelper(node.next[i], cb)
    }
  }
}

function getConstructionExceptionMessage(a, b) {
  let message = abTree.prototype.messages.bValueLessThanRequiredMinimum
  message = message.replace('{{a}}', a)
  message = message.replace('{{b}}', b)
  return message
}

module.exports = abTree
