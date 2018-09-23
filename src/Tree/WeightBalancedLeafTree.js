const LeafTree = require('./LeafTree')
const { balanceByWeight, defaultAlpha, defaultEpsilon } = require('./treeUtils')

class WeightBalancedLeafTree extends LeafTree {
  constructor(alpha = defaultAlpha, epsilon = defaultEpsilon) {
    super()
    this.alpha = alpha
    this.epsilon = epsilon
  }
}

WeightBalancedLeafTree.prototype.balance = function(stackedNodes) {
  const { alpha, epsilon } = this
  balanceByWeight(stackedNodes, alpha, epsilon)
}

module.exports = WeightBalancedLeafTree
