const MultiLeafTree = require('../MultiLeafTree')
const LinkedList = require('../../ch1/LinkedList')
const {
  valueGenerator,
  duplicateValueGenerator,
  addDuplicateValues,
  testWithDifferentKeyInsertionOrders
} = require('./util')

describe('MultiLeafTree', () => {
  let tree = null
  beforeEach(() => tree = new MultiLeafTree())

  describe('#find', () => {
    testWithDifferentKeyInsertionOrders(testFind, MultiLeafTree)
  })
  describe('#intervalFind', () => {
    testWithDifferentKeyInsertionOrders(testIntervalFind, MultiLeafTree)
  })
  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, MultiLeafTree)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, MultiLeafTree)
  })
})

function testFind(getTree) {
  const numEl = 100
  const duplicateNumEl = Math.floor(numEl / 4)
  it('returns empty linked list if there are no values associated with the given key (when tree is empty)', () => {
    const tree = getTree(0)
    const randomKeyVal = 1
    const values = tree.find(randomKeyVal)
    expect(values.length).toEqual(0)
  })
  it('returns empty linked list if there are no values associated with the given key (when key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    const values = tree.find(nextKey)
    expect(values.length).toEqual(0)
  })
  it('returns linked list of values associated with the given key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      const values = tree.find(i)
      expect(values instanceof LinkedList).toEqual(true)
      expect(values.entries()).toEqual([duplicateValueGenerator(i), valueGenerator(i)])
      i--
    }
  })
  it('returns an array of values associated with the given key if the "lazy" argument is set to false', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      expect(tree.find(i, false)).toEqual([duplicateValueGenerator(i), valueGenerator(i)])
      i--
    }
  })
}

function testIntervalFind(getTree) {
  const numEl = 100
  const duplicateNumEl = Math.floor(numEl / 4)
  it('returns a linked list of the pointers in the interval (the value of each node being a linked list)', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)

    const intervalStart = Math.floor(duplicateNumEl / 2)
    const intervalEnd = intervalStart + 10

    const interval = tree.intervalFind(intervalStart, intervalEnd)
    let i = intervalEnd - 1
    interval.each(({ key,  valueList }) => {
      expect(valueList instanceof LinkedList).toEqual(true)
      expect(key).toEqual(i)
      expect(valueList.entries()).toEqual([duplicateValueGenerator(i), valueGenerator(i)])
      i--
    })
  })
  it('returns empty linked list if there are no elements in the specified interval', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)

    const intervalStart = numEl + 2
    const intervalEnd = intervalStart + 10

    const interval = tree.intervalFind(intervalStart, intervalEnd)
    expect(interval.isEmpty()).toEqual(true)
  })
  it('excludes elements equal to the closing interval key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)

    const intervalStart = Math.floor(numEl / 2)
    const intervalEnd = intervalStart + 10

    const interval = tree.intervalFind(intervalStart, intervalEnd)
    expect(interval.length).toEqual(intervalEnd - intervalStart) // one less than the interval size
  })
}

function testDeletion(getTree) {
  const numEl = 100
  const duplicateNumEl = Math.floor(numEl / 4)
  const numToDelete = duplicateNumEl
  it('returns empty linked list if deletion failed (when tree is empty)', () => {
    const tree = getTree(0)
    const randomKey = 1
    const valueList = tree.delete(randomKey)
    expect(valueList.length).toEqual(0)
  })
  it('returns empty linked list if deletion failed (when key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    const valueList = tree.delete(nextKey)
    expect(valueList.length).toEqual(0)
  })
  it('returns a LinkedList of the values for the given key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      const valueList = tree.delete(i)
      expect(valueList.entries()).toEqual([duplicateValueGenerator(i), valueGenerator(i)])
      i--
    }
  })
  it('removes all values associated with the given key', () => {
    const tree = getTree(numEl)
    addDuplicateValues(tree, duplicateNumEl)
    let i = duplicateNumEl
    while (i) {
      const valueList = tree.delete(i)
      expect(valueList.length).toEqual(2)
      const valueListAfterDeletion = tree.delete(i)
      expect(valueListAfterDeletion.length).toEqual(0)
      i--
    }
  })
}

function testInsertion(getTree) {
  const numEl = 100
  it('increases the leaveCount for each unique key insert', () => {
    let oldLeaveCount = 0
    getTree(numEl, (tree) => {
      expect(tree.leaveCount).toEqual(oldLeaveCount + 1)
      oldLeaveCount = tree.leaveCount
    })
  })
  it('does not increase leaveCount for subsequent inserts of similar key values', () => {
    const duplicateNumEl = 20
    const tree = getTree(numEl)
    const oldLeaveCount = tree.leaveCount
    addDuplicateValues(tree, duplicateNumEl, (tree) => {
      expect(tree.leaveCount).toEqual(oldLeaveCount)
    })
  })
}
