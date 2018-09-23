const MultiLeafTree = require('./MultiLeafTree')
const HeightBalancedLeafTree = require('./HeightBalancedLeafTree')

class HeightBalancedMultiLeafTree extends MultiLeafTree {}

Object.assign(HeightBalancedMultiLeafTree.prototype, HeightBalancedLeafTree.prototype)

module.exports = HeightBalancedMultiLeafTree
