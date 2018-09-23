const LeafTree = require('./LeafTree')
const { balanceByHeight } = require('./treeUtils')

class HeightBalancedLeafTree extends LeafTree {
  balance(stackedNodes) {
    balanceByHeight(stackedNodes)
  }
}

module.exports = HeightBalancedLeafTree
