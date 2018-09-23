const WeightBalancedMultiLeafTree = require('../WeightBalancedMultiLeafTree')
const performGenericMultiLeafTreeTests = require('./MultiLeafTree.spec')
const performTestsSpecificToWeightBalancedTrees = require('./WeightBalancedLeafTree.spec')

describe('WeightBalancedMultiLeafTree', () => {
  performGenericMultiLeafTreeTests(WeightBalancedMultiLeafTree)
  performTestsSpecificToWeightBalancedTrees(WeightBalancedMultiLeafTree)
})
