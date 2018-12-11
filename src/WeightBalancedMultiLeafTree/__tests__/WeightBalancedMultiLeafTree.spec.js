const Tree = require('../WeightBalancedMultiLeafTree')
const performGenericMultiLeafTreeTests = require('../../MultiLeafTree/__tests__/MultiLeafTree.spec')
const performTestsSpecificToWeightBalancedTrees = require('../../WeightBalancedLeafTree/__tests__/WeightBalancedLeafTree.spec')

describe('WeightBalancedMultiLeafTree', () => {
  performGenericMultiLeafTreeTests(Tree)
  performTestsSpecificToWeightBalancedTrees(Tree)
})
