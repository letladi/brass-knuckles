const Node = require('./abTreeNode')
const Stack = require('../../ch1/Stack')
const binarySearch = require('../../util/binarySearch')
const { find, isOverflowing, isUnderflowing, navigateTree } = require('./util')
const { first, last, length } = require('../../util/index')

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
    this.balance(nodesOnNavigationPath)
    return true
  }

  balance(stackedNodes) {
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

    const index = find(node.keys, key)
    const keyExists = node.keys[index] === key
    if (keyExists) return false

    node.add(key, val)
    this._count++
    this.balance(nodesOnNavigationPath)
    return true
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
