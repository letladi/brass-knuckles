const Stack = require('../Stack/Stack')
const Node = require('./LeafTreeNode')
const { copyNode } = require('./treeUtils')

function navigateTree(node, key) {
  const stack = new Stack()
  while (!node.isLeaf()) {
    stack.push(node)
    node = (key < node.key) ? node.left : node.right
  }
  stack.push(node)
  return stack
}

function attachLeaves(node, leave1, leave2) {
  if (node.key < key) {
    node.left = oldLeaf
    node.right = newLeaf
    node.key = key
  } else {
    node.left = newLeaf
    node.right = oldLeaf
  }
}

class LeafTree {
  constructor() {
    this.root = this.createNode()
  }

  isEmpty() {
    return this.root.isEmpty()
  }

  createNode(key, left, right) {
    return new Node(key, left, right)
  }

  find(key) {
    if (this.isEmpty()) return null
    const nodesOnNavigationPath = navigateTree(this.root, key)
    const node = nodesOnNavigationPath.top()
    return (node.key === key) ? node.value : null
  }

  add(key, val) {
    return this.insert(key, val)
  }

  insert(key, val) {
    if (this.isEmpty()) this.root = this.createNode(key, val)
    else {
      const nodesOnNavigationPath = navigateTree(this.root, key)
      const node = nodesOnNavigationPath.top()

      if (node.key === key) return false
      else {
        let oldLeaf = this.createNode(node.key, node.value)
        const newLeaf = this.createNode(key, val)

        if (node.key < key) {
          node.left = oldLeaf
          node.right = newLeaf
          node.key = key
        } else {
          node.left = newLeaf
          node.right = oldLeaf
        }
      }
      this.balance(nodesOnNavigationPath)
    }
    return true
  }

  set(key, val) {
    if (this.isEmpty()) this.root = this.createNode(key, val)
    else {
      const nodesOnNavigationPath = navigateTree(this.root, key)
      const node = nodesOnNavigationPath.top()

      if (node.key === key) {
        node.left = val
        return
      }
      else {
        let oldLeaf = this.createNode(node.key, node.value)
        const newLeaf = this.createNode(key, val)

        if (node.key < key) {
          node.left = oldLeaf
          node.right = newLeaf
          node.key = key
        } else {
          node.left = newLeaf
          node.right = oldLeaf
        }
        this.balance(nodesOnNavigationPath)
      }
    }
  }

  delete(key) {
    if (this.isEmpty()) return null
    else if (this.root.isLeaf()) {
      if (this.root.key === key) {
        const deleteVal = this.root.value
        this.root.left = null
        return deleteVal
      }
      return null
    } else {
      const nodesOnNavigationPath = navigateTree(this.root, key)
      const node = nodesOnNavigationPath.pop()

      if (node.key !== key) return null
      else {
        const parent = nodesOnNavigationPath.pop()
        const sibling = parent.left === node ? parent.right : parent.left
        copyNode(parent, sibling)

        this.balance(nodesOnNavigationPath)
        return node.value
      }
    }
  }

  balance(stackedNodes) {
    stackedNodes.clear()
  }

  intervalFind(a, b) {
    let resultList = null
    const stack = new Stack()
    stack.push(this.root)

    while (!stack.isEmpty()) {
      const current = stack.pop()
      if (current.isLeaf()) {
        if (a <= current.key && current.key < b) {
          const temp = this.createNode(current.key, current.value, resultList)
          resultList = temp
        }
      } else if (b <= current.key) {
        stack.push(current.left)
      } else if (current.key <= a) {
        stack.push(current.right)
      } else {
        stack.push(current.left)
        stack.push(current.right)
      }
    }
    return resultList
  }
}

module.exports = LeafTree
