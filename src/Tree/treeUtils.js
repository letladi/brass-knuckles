const assert = require('assert')

const swapKeys = (node1, node2) => {
  const tempKey = node1.key
  node1.key = node2.key
  node2.key = tempKey
}

const height = node => {
  if (node.isLeaf()) return 0
  return 1 + Math.max(height(node.left), height(node.right))
}

const copyNode = (target, src) => Object.assign(target, src)

const assertLeftRotationConditions = (node) => {
  assert(!node.isLeaf(), 'can only perform left rotation on interior error')
  assert(!node.right.isLeaf(), 'can only perform left rotation if node.right is interior node')
}

const assertRightRotationConditions = node => {
  assert(!node.isLeaf(), 'can only perform right rotation on interior error')
  assert(!node.left.isLeaf(), 'can only perform right rotation if node.left is interior node')
}

const rotateRight = node => {
  assertRightRotationConditions(node)

  swapKeys(node, node.left)
  const temp = node.right

  node.right = node.left
  node.left = node.left.left

  node.right.left = node.right.right
  node.right.right = temp

  return node
}

const rotateLeft = node => {
  assertLeftRotationConditions(node)

  swapKeys(node, node.right)
  const temp = node.left

  node.left = node.right
  node.right = node.right.right

  node.left.right = node.left.left
  node.left.left = temp

  return node
}

const weight = node => node.isLeaf() ? 1 : weight(node.left) + weight(node.right)

// TODO: Optimize storage/retrieval of weight values
const balanceByWeight = (nodeStack, alpha, epsilon) => {
  let current = null
  while (!nodeStack.isEmpty()) {
    current = nodeStack.pop()
    if (weight(current.right) < alpha * weight(current)) {
      if (weight(current.left.left) > (alpha + epsilon) * weight(current)) {
        rotateRight(current)
      } else {
        rotateLeft(current.left)
        rotateRight(current)
      }
    } else if (weight(current.left) < alpha * weight(current)) {
      if (weight(current.right.right) > (alpha + epsilon) * weight(current)) {
        rotateLeft(current)
      } else {
        rotateRight(current.right)
        rotateLeft(current)
      }
    }
  }
}

// TODO: Optimize storage/retrieval of height values
const balanceByHeight = (nodeStack) => {
  let current = null
  while (!nodeStack.isEmpty()) {
    current = nodeStack.pop()
    const balanceFactor = height(current.left) - height(current.right)

    if (balanceFactor === 2) {
      if (height(current.left.left) - height(current.right) === 1) {
        rotateRight(current)
      } else {
        rotateLeft(current.left)
        rotateRight(current)
      }
    } else if (balanceFactor === -2) {
      if (height(current.right.right) - height(current.left) === 1) {
        rotateLeft(current)
      } else {
        rotateRight(current.right)
        rotateLeft(current)
      }
    }
  }
}

module.exports = {
  height,
  swapKeys,
  copyNode,
  rotateRight,
  rotateLeft,
  weight,
  balanceByHeight,
  balanceByWeight,
}
