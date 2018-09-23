const LeafTree = require('./LeafTree')
const { balanceByWeight } = require('./treeUtils')

class WeightBalancedLeafTree extends LeafTree {
  constructor(alpha = 0.288, epsilon = 0.005) {
    super()
    this.alpha = 0.288
    this.epsilon = 0.005
  }

  balance(stackedNodes) {
    const { alpha, epsilon } = this
    balanceByWeight(stackedNodes, alpha, epsilon)
  }
}

module.exports = WeightBalancedLeafTree
