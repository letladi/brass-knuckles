const { shuffle } = require('lodash')
const Node = require('../abTreeNode')

describe('abTreeNode', () => {
  let node = null
  beforeEach(() => {
    node = new Node()
  })
  describe('#isLeaf', () => {
    it('= true if height = 0', () => {
      expect(node.isLeaf()).toEqual(true)
    })
    it('= false if height > 0', () => {
      node.height = 3
      expect(node.isLeaf()).toEqual(false)
    })
  })

  describe('#add', () => {
    beforeEach(() => {
      const valuesToAdd = shuffle([[1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five'], [6, 'six'], [7, 'seven']])
      valuesToAdd.forEach(([key, val]) => node.add(key, val))
    })
    it('it adds the key in the appropriate place in the "keys" array', () => {
      const expectedKeys = [1, 2, 3, 4, 5, 6, 7]
      expect(node.keys).toEqual(expectedKeys)
    })
    it('it adds the value in the appropriate place in the "next" array', () => {
      const expectedValues = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
      expect(node.next).toEqual(expectedValues)
    })
  })

  describe('.degree', () => {
    it('= value to the number of keys in the "keys" array', () => {
        const valuesToAdd = [[1, 'one'], [2, 'two'], [3, 'three']]
        valuesToAdd.forEach(([key, val]) => node.add(key, val))
        expect(node.degree).toEqual(3)
    })
    it('= 0 if there are zero keys/values', () => {
      expect(node.degree).toEqual(0)
    })
  })
  describe('#isEmpty', () => {
    it('returns true if node does not have any keys/values', () => {
      expect(node.isEmpty()).toEqual(true)
    })
    it('returns false if node contains keys/values', () => {
      node.add(1, 'one')
      expect(node.isEmpty()).toEqual(false)
    })
  })
})
