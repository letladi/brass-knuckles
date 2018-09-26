const Tree = require('../HeightBalancedMultiLeafTree')
const performGenericMultiLeafTreeTests = require('./MultiLeafTree.spec')
const performTestsSpecificToHeightBalancedTrees = require('./HeightBalancedLeafTree.spec')

describe('HeightBalancedMultiLeafTree', () => {
  performGenericMultiLeafTreeTests(Tree)
  performTestsSpecificToHeightBalancedTrees(Tree)
})
