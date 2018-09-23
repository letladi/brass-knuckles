const { defaultAlpha, defaultEpsilon } = require('./treeUtils')
const MultiLeafTree = require('./MultiLeafTree')
const WeightBalancedLeafTree = require('./WeightBalancedLeafTree')

class WeightBalancedMultiLeafTree extends MultiLeafTree {
  constructor(alpha = defaultAlpha, epsilon = defaultEpsilon) {
    super()
    this.alpha = alpha
    this.epsilon = epsilon
  }
}

Object.assign(WeightBalancedMultiLeafTree.prototype, WeightBalancedLeafTree.prototype)

module.exports = WeightBalancedMultiLeafTree
