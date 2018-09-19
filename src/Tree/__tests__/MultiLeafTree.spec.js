const MultiLeafTree = require('../MultiLeafTree')

describe('MultiLeafTree', () => {
  let tree = null
  beforeEach(() => tree = new MultiLeafTree())

  describe('#find', () => {
    it('returns [] if there are no values associated with the given key (when tree is empty)', () => {
      expect(tree.find(1)).toEqual([])
    })
    it('returns [] if there are no values associated with the given key (when key does not exist in the tree)', () => {
      tree.insert(2, 'two')
      tree.insert(3, 'three')
      expect(tree.find(1)).toEqual([])
    })
    it('returns an array of values associated with the given key', () => {
      tree.insert(1, 'one')
      tree.insert(1, 1)
      tree.insert(2, 'two')
      tree.insert(3, 'three')
      expect(tree.find(1)).toEqual([1, 'one'])
      expect(tree.find(2)).toEqual(['two'])
      expect(tree.find(3)).toEqual(['three'])
    })
  })
  describe('#intervalFind', () => {
    function populateForIntervalTest(tree) {
      tree.insert(1, 1)
      tree.insert(1, 'one')
      tree.insert(2, 2)
      tree.insert(2, 'two')
      tree.insert(3, 'three')
      tree.insert(4, 'four')
      tree.insert(5, 'five')
    }
    beforeEach(() =>   populateForIntervalTest(tree))
    it('returns a type of linked list of the pointers in the interval (the value of each node being an array)', () => {
      const intervalValues = [[1, ['one', 1]], [2, ['two', 2]], [3, ['three']], [4, ['four']]]


      let interval = tree.intervalFind(1, 5)
      intervalValues.forEach(([key, val]) => {
        expect(interval.key).toEqual(key)
        expect(interval.value).toEqual(val)
        interval = interval.right
      })
    })
    it('returns null if there are no elements in the specified interval', () => {
      expect(tree.intervalFind(8, 10)).toEqual(null)
    })
    it('excludes elements equal to the closing interval key', () => {
      const interval = tree.intervalFind(1, 2)
      expect(interval.right).toEqual(null)
    })
  })
  describe('#delete', () => {
    it('returns [] if deletion failed (when tree is empty)', () => {
      expect(tree.delete(1)).toEqual([])
    })
    it('returns [] if deletion failed (when key does not exist in the tree)', () => {
      tree.insert(1, 'one')
      expect(tree.delete(2)).toEqual([])
    })
    it('returns an array of the values for the given key', () => {
      tree.insert(1, 'one')
      tree.insert(1, 1)
      expect(tree.delete(1)).toEqual([1, 'one'])
    })
    it('removes all values associated with the given key', () => {
      tree.insert(1, 'one')
      tree.insert(1, 1)
      tree.delete(1)
      expect(tree.find(1)).toEqual([])
    })
  })
  describe('#insert', () => {
    it('increases the leaveCount for each unique key insert', () => {
      tree.insert(1, 'one')
      expect(tree.leaveCount).toEqual(1)
      tree.insert(2, 'two')
      expect(tree.leaveCount).toEqual(2)
      tree.insert(3, 'three')
      expect(tree.leaveCount).toEqual(3)
    })
    it('does not increase leaveCount for subsequent inserts of similar key values', () => {
      tree.insert(1, 'one')
      expect(tree.leaveCount).toEqual(1)
      tree.insert(1, 'two')
      expect(tree.leaveCount).toEqual(1)
      tree.insert(1, 'three')
      expect(tree.leaveCount).toEqual(1)
    })
  })
})
