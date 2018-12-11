const LeafTree = require('../LeafTree/LeafTree')
const { balanceByHeight } = require('../util/treeUtils')

class HeightBalancedLeafTree extends LeafTree {}

HeightBalancedLeafTree.prototype.balance = function(stackedNodes) {
  balanceByHeight(stackedNodes)
}

module.exports = HeightBalancedLeafTree
