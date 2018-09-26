const Tree = require('../WeightBalancedMultiLeafTree')
const performGenericMultiLeafTreeTests = require('./MultiLeafTree.spec')
const performTestsSpecificToWeightBalancedTrees = require('./WeightBalancedLeafTree.spec')

describe('WeightBalancedMultiLeafTree', () => {
  performGenericMultiLeafTreeTests(Tree)
  performTestsSpecificToWeightBalancedTrees(Tree)
})
