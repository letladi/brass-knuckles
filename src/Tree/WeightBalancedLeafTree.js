const HeightBalancedLeafTree = require('./HeightBalancedLeafTree')
const Node = require('./LeafTreeNode')
const Stack = require('../ch1/Stack')
const { weight, rotateLeft, rotateRight } = require('./treeUtils')

// TODO: Optimize storage/retrieval of weight values
class WeightBalancedLeafTree extends HeightBalancedLeafTree {
  constructor(alpha = 0.288, epsilon = 0.005) {
    super()
    this.alpha = 0.288
    this.epsilon = 0.005
  }

  _balance(stackedNodes) {
    const { alpha, epsilon } = this
    let current = null
    while (!stackedNodes.isEmpty()) {
      current = stackedNodes.pop()
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
}

module.exports = WeightBalancedLeafTree
