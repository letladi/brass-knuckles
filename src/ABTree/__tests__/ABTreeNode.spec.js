const { shuffle } = require('lodash')
const Node = require('../ABTreeNode')
const { valueGenerator } = require('../../util/util')
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
    it('adds the key in the appropriate place in the "keys" array', () => {
      const expectedKeys = [1, 2, 3, 4, 5, 6, 7]
      expect(node.keys).toEqual(expectedKeys)
    })
    it('adds the value in the appropriate place in the "next" array', () => {
      const expectedValues = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
      expect(node.next).toEqual(expectedValues)
    })
  })

  describe('#delete', () => {
    beforeEach(() => {
      const valuesToAdd = shuffle([[1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five'], [6, 'six'], [7, 'seven']])
      valuesToAdd.forEach(([key, val]) => node.add(key, val))
    })
    it('removes the key and its value', () => {
      const keyToDelete = 4
      const expectedKeys = [1, 2, 3, 5, 6, 7]
      const expectedValues = ['one', 'two', 'three', 'five', 'six', 'seven']
      node.delete(keyToDelete)
      expect(node.keys).toEqual(expectedKeys)
      expect(node.next).toEqual(expectedValues)
    })
    it('returns associated key value if deletion succeeded', () => {
      const existingKey = 4
      const expectedValue = 'four'
      expect(node.delete(existingKey)).toEqual(expectedValue)
    })
    it('returns null if deletion failed (like when value does not exist)', () => {
      const missingKey = 10
      expect(node.delete(missingKey)).toEqual(null)
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

    beforeEach(() => populateNode(numEl, node))
    describe('result.found', () => {
      it('= true if key exists in the node', () => {
        expect(node.search(existingKey).found).toEqual(true)
      })
      it('= false if key does not exist in the tree', () => {
        expect(node.search(missingKey).found).toEqual(false)
      })
    })
    it('= index where key must be inserted (when it does not exist)', () => {
      expect(node.search(missingKey).index).toEqual(missingKeyIndex)
    })
    it('= index where key must be inserted (when it exists)', () => {
      expect(node.search(existingKey).index).toEqual(existingKeyIndex)
    })
  })

  describe('#split', () => {
    const numEl = 10
    const expectedKeysForOriginalNode = [1, 2, 3, 4, 5]
    const expectedKeysForNewNode = [6, 7, 8, 9, 10]
    const expectedValuesForOriginalNode = expectedKeysForOriginalNode.map((k) => valueGenerator(k))
    const expectedValuesForNewNode = expectedKeysForNewNode.map((k) => valueGenerator(k))

    beforeEach(() => populateNode(numEl, node))
    it('returns another node with the same properties as the current node', () => {
      const other = node.split()
      expect(other.height).toEqual(node.height)
      expect(other.degree).toEqual(node.degree)
    })
    it('divides degree by 2', () => {
      node.height = 2
      const oldDegree = node.degree
      const other = node.split()
      expect(node.degree).toEqual(Math.floor(oldDegree / 2))
      expect(node.height).toEqual(other.height)
    })
    it('moves half the keys into the other node', () => {
      const other = node.split()
      expect(node.keys).toEqual(expectedKeysForOriginalNode)
      expect(other.keys).toEqual(expectedKeysForNewNode)
    })
    it('moves half the "next" values in to the other node', () => {
      const other = node.split()
      expect(node.next).toEqual(expectedValuesForOriginalNode)
      expect(other.next).toEqual(expectedValuesForNewNode)
    })
    it('will have 1 more value than new node if degree is odd', () => {
      const node = new Node()
      populateNode(numEl + 1, node)
      const other = node.split()
      expect(node.degree).toEqual(other.degree + 1)
    })
  })

  describe('#concat', () => {
    let node1Keys, node2Keys, node1Values, node2values, node1, node2
    const expectedKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const expectedValues = expectedKeys.map((k) => valueGenerator(k))

    beforeEach(() => {
      node1 = new Node()
      node2 = new Node()
      node1Keys = shuffle([1, 2, 3, 4, 5])
      node1Values = node1Keys.map((key) => {
        const val = valueGenerator(key)
        node1.add(key, val)
        return val
      })
      node2Keys = shuffle([6, 7, 8, 9, 10])
      node2Values = node2Keys.map((key) => {
        const val = valueGenerator(key)
        node2.add(key, val)
        return val
      })
    })
    it('it adds all the keys in the other node into the current node keys', () => {
      node1.concat(node2)
      expect(node1.keys).toEqual(expectedKeys)
    })
    it('it add all the values in the other node into the current node values', () => {
      node1.concat(node2)
      expect(node1.next).toEqual(expectedValues)
    })
  })
})
