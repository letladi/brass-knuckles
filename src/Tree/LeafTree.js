const Stack = require('../ch1/Stack')
const Node = require('./LeafTreeNode')
const { copyNode, height } = require('./treeUtils')

function navigateTree(node, key) {
  const stack = new Stack()
  while (!node.isLeaf()) {
    stack.push(node)
    node = (key < node.key) ? node.left : node.right
  }
  stack.push(node)
  return stack
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
      }
      this.balance(nodesOnNavigationPath)
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

  /*
    This function is overridden in subclasses which
    balance their nodes
  */
  balance(stackedNodes) {
    stackedNodes.clear()
  }

  traverse(cb) {
    let current = this.root
    const stack = new Stack()

    while (current || !stack.isEmpty()) {
      if (current) {
        stack.push(current)
        current = current.left
      } else {
        current = stack.pop()
        cb(current)
        current = current.right
      }
    }
  }

  get leaveCount() {
    let count = 0
    if (this.isEmpty()) return count

    this.traverse((node) => count += node.isLeaf() ? 1 : 0)
    return count
  }

  get nodeCount() {
    let count = 0
    if (this.isEmpty()) return count

    this.traverse(() => count++)
    return count
  }

  get height() {
    return height(this.root)
  }

  get interiorNodeCount() {
    let count = 0
    if (this.isEmpty()) return count
    this.traverse((node) => count += node.isLeaf() ? 0 : 1)
    return count
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

  /* the average depth of the leaves; the average over all objects of the distance
    we have to go to reach that object
  */
  get averageDepth() {

  }
}

module.exports = LeafTree
