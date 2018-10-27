const assert = require('assert')
const Stack = require('../Stack/Stack')
const LeafTreeNode = require('./LeafTreeNode')

const swapKeys = (node1, node2) => {
  const tempKey = node1.key
  node1.key = node2.key
  node2.key = tempKey
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

const getRoot = tree => tree.root

function traverse(tree, cb) {
  let current = getRoot(tree)
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

function leaveCount(tree) {
  let count = 0
  if (tree.isEmpty()) return count

  traverse(tree, (node) => count += node.isLeaf() ? 1 : 0)
  return count
}

function heightHelper(node) {
  return node.isLeaf() ? 0 : 1 + Math.max(heightHelper(node.left), heightHelper(node.right))
}

const has = (obj, key) => key in obj

function height(tree) {
  const root = has(tree, 'root') ? getRoot(tree) : tree
  return heightHelper(root)
}

function nodeCount(tree) {
  let count = 0
  if (tree.isEmpty()) return count
  traverse(tree, () => count++)
  return count
}

function interiorNodeCount(tree) {
  let count = 0
  if (tree.isEmpty()) return count
  traverse(tree, (node) => count += node.isLeaf() ? 0 : 1)
  return count
}

function totalDepth(node, depth = 0) {
  if (!LeafTreeNode.isNode(node)) return 0
  return depth + totalDepth(node.left, depth + 1) + totalDepth(node.right, depth + 1)
}
// TODO: Look at other implementations of this concept
const averageDepth = tree => totalDepth(getRoot(tree)) / nodeCount(tree)

const defaultAlpha = 0.288
const defaultEpsilon = 0.005

module.exports = {
  height,
  swapKeys,
  copyNode,
  rotateRight,
  rotateLeft,
  weight,
  balanceByHeight,
  balanceByWeight,
  defaultAlpha,
  defaultEpsilon,
  leaveCount,
  nodeCount,
  traverse,
  averageDepth,
  interiorNodeCount,
}
