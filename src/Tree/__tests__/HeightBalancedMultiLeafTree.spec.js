const HeightBalancedMultiLeafTree = require('../HeightBalancedMultiLeafTree')
const performGenericMultiLeafTreeTests = require('./MultiLeafTree.spec')
const performTestsSpecificToHeightBalancedTrees = require('./HeightBalancedLeafTree.spec')

describe('HeightBalancedMultiLeafTree', () => {
  performGenericMultiLeafTreeTests(HeightBalancedMultiLeafTree)
  performTestsSpecificToHeightBalancedTrees(HeightBalancedMultiLeafTree)
})
