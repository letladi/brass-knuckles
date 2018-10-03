const { shuffle } = require('lodash')
const Node = require('../abTreeNode')
const { populateNode } = require('./testUtil')

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

  describe('#search', () => {
    const numEl = 10
    const existingKey = Math.floor(numEl / 2)
    const existingKeyIndex = existingKey - 1
    const missingKey = numEl + 2
    const missingKeyIndex = numEl
    describe('result.found', () => {
      it('= true if key exists in the node', () => {
        populateNode(numEl, node)
        expect(node.search(existingKey).found).toEqual(true)
      })
      it('= false if key does not exist in the tree', () => {
        populateNode(numEl, node)
        expect(node.search(missingKey).found).toEqual(false)
      })
    })
    it('= index where key must be inserted (when it does not exist)', () => {
      populateNode(numEl, node)
      expect(node.search(missingKey).index).toEqual(missingKeyIndex)
    })
    it('= index where key must be inserted (when it exists)', () => {
      populateNode(numEl, node)
      expect(node.search(existingKey).index).toEqual(existingKeyIndex)
    })
  })
})
