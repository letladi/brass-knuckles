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
      expect(tree.find(1)).toEqual(['one', 1])
      expect(tree.find(2)).toEqual(['two'])
      expect(tree.find(3)).toEqual(['three'])
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
    it('returns and removes an array of the values for the given key', () => {
      tree.insert(1, 'one')
      tree.insert(1, 1)
      expect(tree.delete(1)).toEqual(['one', 1])
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
