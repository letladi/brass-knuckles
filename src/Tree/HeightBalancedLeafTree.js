const LeafTree = require('./LeafTree')
const { balanceByHeight } = require('./treeUtils')

class HeightBalancedLeafTree extends LeafTree {}

HeightBalancedLeafTree.prototype.balance = function(stackedNodes) {
  balanceByHeight(stackedNodes)
}

module.exports = HeightBalancedLeafTree
