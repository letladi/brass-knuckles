const { testWithDifferentKeyInsertionOrders } = require('../../util/util')
const performGenericLeafTreeTests = require('../../LeafTree/__tests__/LeafTree.spec')
const Tree = require('../LevelLinkedTree')


describe('LevelLinkedTree', () => {
  performGenericLeafTreeTests(Tree)
})
