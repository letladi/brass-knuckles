const Stack = require('../ch1/Stack')
const Node = require('./LeafTreeNode')
const { copyNode, height } = require('./treeUtils')

class LeafTree {
  constructor() {
    this.root = new Node()
  }

  isEmpty() {
    return this.root.isEmpty()
  }

  find(key) {
    if (this.isEmpty()) return null
    let current = this.root
    while (!current.isLeaf()) {
      current = (key < current.key) ? current.left : current.right
    }
    return (current.key === key) ? current.value : null
  }

  insert(key, val) {
    if (this.isEmpty()) this.root = new Node(key, val)
    else {
      const stack = new Stack()
      let current = this.root
      while (!current.isLeaf()) {
        stack.push(current)
        current = (key < current.key) ? current.left : current.right
      }

      if (current.key === key) return false
      else {
        let oldLeaf = new Node(current.key, current.value)
        const newLeaf = new Node(key, val)

        if (current.key < key) {
          current.left = oldLeaf
          current.right = newLeaf
          current.key = key
        } else {
          current.left = newLeaf
          current.right = oldLeaf
        }
      }
      this.balance(stack)
    }
    return true
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
      let current = this.root
      let currentParent = null
      let currentSibling = null
      const stack = new Stack()

      while (!current.isLeaf()) {
        stack.push(current)
        currentParent = current
        if (key < current.key) {
          current = currentParent.left
          currentSibling = currentParent.right
        } else {
          current = currentParent.right
          currentSibling = currentParent.left
        }
      }
      if (current.key !== key) return null
      else {
        copyNode(currentParent, currentSibling)
        /* currentParent is now a leaf so we remove it from the stack
           before balancing the nodes
        */
        stack.pop()
        this.balance(stack)
        return current.value
      }
    }
  }

  /*
    This function is overridden in subclasses which
    balance their nodes in some way
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
          const temp = new Node(current.key, current.value, resultList)
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
