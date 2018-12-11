const { defaultAlpha, defaultEpsilon } = require('../util/treeUtils')
const MultiLeafTree = require('../MultiLeafTree/MultiLeafTree')
const WeightBalancedLeafTree = require('../WeightBalancedLeafTree/WeightBalancedLeafTree')

class WeightBalancedMultiLeafTree extends MultiLeafTree {
  constructor(alpha = defaultAlpha, epsilon = defaultEpsilon) {
    super()
    this.alpha = alpha
    this.epsilon = epsilon
  }
}

Object.assign(WeightBalancedMultiLeafTree.prototype, WeightBalancedLeafTree.prototype)

module.exports = WeightBalancedMultiLeafTree
