const LeafTree = require('./LeafTree')
const LinkedList = require('../ch1/LinkedList')
const Stack = require('../ch1/Stack')
const Node = require('./LeafTreeNode')

const initializeListWith = (val) => {
  const list = new LinkedList()
  list.insertLast(val)
  return list
}

const addToValueList = (node, val) => {
  const list = node.value
  list.insertFirst(val)
}

class MultiLeafTree extends LeafTree {
  find(key) {
    const valueList = super.find(key)
    return valueList ? valueList.entries() : []
  }

  intervalFind(a, b) {
    let resultList = null
    const stack = new Stack()
    stack.push(this.root)

    while (!stack.isEmpty()) {
      const current = stack.pop()
      if (current.isLeaf()) {
        if (a <= current.key && current.key < b) {
          const temp = new Node(current.key, current.value.entries(), resultList)
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

  insert(key, val) {
    if (this.isEmpty()) this.root = new Node(key, initializeListWith(val))
    else {
      let current = this.root
      while (!current.isLeaf()) {
        current = (key < current.key) ? current.left : current.right
      }
      if (current.key === key) {
        addToValueList(current, val)
      }
      else {
        let oldLeaf = new Node(current.key, current.value)
        const newLeaf = new Node(key, initializeListWith(val))
        if (current.key < key) {
          current.left = oldLeaf
          current.right = newLeaf
          current.key = key
        } else {
          current.left = newLeaf
          current.right = oldLeaf
        }
      }
    }
  }

  delete(key) {
    const valueList = super.delete(key)
    let values = []
    if (valueList) {
      values = valueList.entries()
      valueList.clear()
    }
    return values
  }
}

module.exports = MultiLeafTree