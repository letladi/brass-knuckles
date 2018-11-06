const assert = require('assert')
const Stack = require('../../Stack/Stack')

function isOverflowing(node, maxDegree) {
  assert(maxDegree, 'maximum degree value to compare with is required')
  return node.degree > maxDegree
}

function isUnderflowing(node, minDegree) {
  assert(minDegree, 'minimum degree value to compare with is required')
  return node.degree < minDegree
}

function navigateTree(treeRoot, key) {
  const stack = new Stack()
  let current = treeRoot
  while (!current.isLeaf()) {
    const index = find(current.keys, key)
    stack.push({ node: current, index })
    current = current.next[index]
  }
  stack.push({ node: current })
  return stack
}

function find(list, key) {
  let lo = 0, hi = list.length
  while (hi > lo + 1) {
    const mid = Math.floor((hi + lo) / 2)
    if (key < list[mid])
      hi = mid
    else
      lo = mid
  }
  return lo
}

const defaultAValue = 550
const defaultBValue = 2 * defaultAValue + 1

module.exports = {
  find,
  navigateTree,
  isOverflowing,
  isUnderflowing,
  defaultAValue,
  defaultBValue,
}
