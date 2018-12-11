const Tree = require('../HeightBalancedMultiLeafTree')
const performGenericMultiLeafTreeTests = require('../../MultiLeafTree/__tests__/MultiLeafTree.spec')
const performTestsSpecificToHeightBalancedTrees = require('../../HeightBalancedLeafTree/__tests__/HeightBalancedLeafTree.spec')

describe('HeightBalancedMultiLeafTree', () => {
  performGenericMultiLeafTreeTests(Tree)
  performTestsSpecificToHeightBalancedTrees(Tree)
})
