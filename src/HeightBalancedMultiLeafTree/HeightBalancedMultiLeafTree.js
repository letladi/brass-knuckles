const MultiLeafTree = require('../MultiLeafTree/MultiLeafTree')
const HeightBalancedLeafTree = require('../HeightBalancedLeafTree/HeightBalancedLeafTree')

class HeightBalancedMultiLeafTree extends MultiLeafTree {}

Object.assign(HeightBalancedMultiLeafTree.prototype, HeightBalancedLeafTree.prototype)

module.exports = HeightBalancedMultiLeafTree
