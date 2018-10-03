const Node = require('../abTreeNode')
const { generateKeysAndValues } = require('../../__tests__/util')
const util = require('../util')
describe('abTree utilities', () => {
  let node = null
  beforeEach(() => {
    node = new Node()
  })
  describe("#isOverflowing", () => {
    const maximumDegree = 10
    it('throws exception if degree to compare with is not given', () => {
      expect(() => util.isOverflowing(node)).toThrow()
    })
    it('returns true if node contains values/keys > maximumDegree', () => {
      populateNode(maximumDegree + 2, node)
      expect(util.isOverflowing(node, maximumDegree)).toEqual(true)
    })
    it('returns false if node contains values/keys < maximumDegree', () => {
      populateNode(Math.floor(maximumDegree / 2), node)
      expect(util.isOverflowing(node, maximumDegree)).toEqual(false)
    })
    it('returns false if node contains values/keys == maximumDegree', () => {
      populateNode(maximumDegree, node)
      expect(util.isOverflowing(node, maximumDegree)).toEqual(false)
    })
  })
  describe('#isUnderflowing', () => {
    const minimumDegree = 10
    it('throws exception if degree to compare with is not given', () => {
      expect(() => util.isUnderflowing(node)).toThrow()
    })
    it('returns true if node contains values/keys < minimumDegree', () => {
      populateNode(Math.floor(minimumDegree / 2), node)
      expect(util.isUnderflowing(node, minimumDegree)).toEqual(true)
    })
    it('returns false if node contains values/keys > minimumDegree', () => {
      populateNode(minimumDegree + 2, node)
      expect(util.isUnderflowing(node, minimumDegree)).toEqual(false)
    })
    it('returns false if node contains values/keys == minimumDegree', () => {
      populateNode(minimumDegree, node)
      expect(util.isUnderflowing(node, minimumDegree)).toEqual(false)
    })
  })
})

function populateNode(count, node) {
  const valuesToAdd = generateKeysAndValues(count)
  valuesToAdd.forEach(([key, val]) => node.add(key, val))
}
