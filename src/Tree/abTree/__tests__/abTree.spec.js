const Tree = require('../ABTree')
const { defaultAValue, defaultBValue } = require('../util')
const {
  valueGenerator,
  getBaseLog,
  testWithDifferentKeyInsertionOrders
} = require('../../__tests__/util')

describe('ABTree', () => {
  it('does not allow b to be less than 2a when constructing tree', () => {
    expect(() => new Tree(500, 900)).toThrow()
  })
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, Tree)
  })
  describe('#find', () => {
    testWithDifferentKeyInsertionOrders(testFind, Tree)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, Tree)
  })
  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, Tree)
  })
  describe('.size', () => {
    testWithDifferentKeyInsertionOrders(testSizeProperty, Tree)
  })
  describe('#traverse', () => {
    testWithDifferentKeyInsertionOrders(testTraversal, Tree)
  })
  describe('.leaveCount', () => {
    testWithDifferentKeyInsertionOrders(testLeaveCount, Tree)
  })
  describe('.height', () => {
    testWithDifferentKeyInsertionOrders(testHeight, Tree)
  })
})

const leaveCountMin = (height, a) => 2 * a ** (height - 1)
const leaveCountMax = (height, b) => b ** height
const approximateHeightMax = (leaveCount, a) => Math.ceil(getBaseLog(a, leaveCount) + (1 - getBaseLog(a, 2)))

function testTreeProperties(getTree) {
  const numEl = 200000
  const formulaForMaxHeightGivenLeaveCount = 'Math.ceil(loga(n) + (1 - loga2)) (approx. [(1/log2(a))log2(n)]'

  test('if height = h >= 1; leaveCount >= 2a^(h-1)', () => {
    const tree = getTree(numEl)
    expect(tree.leaveCount).toBeGreaterThanOrEqual(leaveCountMin(tree.height, tree.a))
  })
  test('if height = h >= 1; leaveCount <= b^h', () => {
    const tree = getTree(numEl)
    expect(tree.leaveCount).toBeLessThanOrEqual(leaveCountMax(tree.height, tree.b))
  })
  test(`if leaveCount = n >= 2; height <= ${formulaForMaxHeightGivenLeaveCount}`, () => {
    const tree = getTree(numEl)
    expect(tree.height).toBeLessThanOrEqual(approximateHeightMax(tree.leaveCount, tree.a))
  })
}

function testFind(getTree) {
  const numEl = 200000
  it('returns the key value if it exists', () => {
    const tree = getTree(numEl)
    let keyToSearch = numEl
    while (keyToSearch) {
      expect(tree.find(keyToSearch)).toEqual(valueGenerator(keyToSearch))
      keyToSearch--
    }
  })
  it('returns null if the key value does not exist', () => {
    const tree = getTree(numEl)
    const missingKey = numEl + 10
    expect(tree.find(missingKey)).toEqual(null)
  })
}

function testInsertion(getTree) {
  const numEl = 200000
  it('returns true if insertion succeeds', () => {
    const tree = getTree(numEl)
    const nextKeyEl = numEl + 1
    expect(tree.insert(nextKeyEl, valueGenerator(nextKeyEl))).toEqual(true)
  })
  it('returns false if insertion fails (like when there is a duplicate)', () => {
    const tree = getTree(numEl)
    const existingKey = Math.floor(numEl / 2)
    expect(tree.insert(existingKey, valueGenerator(existingKey))).toEqual(false)
  })
  describe('insertion into empty tree', () => {
    describe('elements inserted <= b', () => {
      it('leaveCount = 1 after first insert', () => {
        const tree = new Tree()
        tree.insert(1, 'one')
        expect(tree.leaveCount).toEqual(1)
      })
    })
  })
  it('should increase height on the b-th insert in a node', () => {
    const tree = getTree(defaultBValue)
    const prevHeight = tree.height
    const nextKey = defaultBValue + 1
    tree.insert(nextKey, valueGenerator(nextKey))
    expect(tree.height).toEqual(prevHeight + 1)
  })
  it('should increase the leaveCount on the b-th insert in a node', () => {
    const tree = getTree(defaultBValue)
    const prevLeaveCount = tree.leaveCount
    const nextKey = defaultBValue + 1
    tree.insert(nextKey, valueGenerator(nextKey))
    expect(tree.leaveCount).toEqual(prevLeaveCount + 1)
  })
}

function testDeletion(getTree) {
  const numEl = 200000
  it('returns null if deletion failed (when tree is empty)', () => {
    const tree = getTree(0)
    expect(tree.delete(1)).toEqual(null)
  })
  it('returns null if deletion failed (when key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const missingKey = numEl + 1
    expect(tree.delete(missingKey)).toEqual(null)
  })
  it('returns and removes the value associated with the deleted key', () => {
    const tree = getTree(numEl)
    const existingKey = Math.floor(numEl / 2)
    expect(tree.find(existingKey)).toEqual(valueGenerator(existingKey))
    tree.delete(existingKey)
    expect(tree.find(existingKey)).toEqual(null)
  })
  it('does not decrease leaveCount if number of values >= "a" after deletion from a node', () => {
    const numEl = 1500
    const tree = getTree(numEl)
    const prevLeaveCount = tree.leaveCount
    let numToDelete = 100
    while (numToDelete) tree.delete(numToDelete--)
    expect(tree.leaveCount).toEqual(prevLeaveCount)
  })
  it('decreases leaveCount if number of values < "a" after deletion from a node', () => {
    const numEl = 1500
    const tree = getTree(numEl)
    const prevLeaveCount = tree.leaveCount
    let numToDelete = Math.floor(numEl / 2)
    while (numToDelete) tree.delete(numToDelete--)
    expect(tree.leaveCount).toEqual(prevLeaveCount - 1)

  })
  it('decreases height if number of values < "a" after deletion from a node', () => {
    const numEl = 1500
    const tree = getTree(numEl)
    const prevHeight = tree.height
    let numToDelete = Math.floor(numEl / 2)
    while (numToDelete) tree.delete(numToDelete--)
    expect(tree.height).toEqual(prevHeight - 1)

  })
  it('decreases the size by 1', () => {
    const elCount = Math.floor(numEl / 10)
    const tree = getTree(elCount)
    const existingKey = Math.floor(elCount / 2)
    const prevSize = tree.size
    tree.delete(existingKey)
    expect(tree.size).toEqual(prevSize - 1)
  })
}

function testTraversal(getTree) {
  const numEl = 100
  it('traverses the tree in key order', () => {
    const tree = getTree(numEl)
    let prevKey = null
    tree.traverse((k) => {
      if (prevKey) {
        expect(prevKey).toBeLessThanOrEqual(k)
      }
    })

  })
  it("traverses the tree with a key and it's value", () => {
    const tree = getTree(numEl)
    tree.traverse((k, v) => {
      expect(v).toEqual(valueGenerator(k))
    })
  })
}

function testSizeProperty(getTree) {
  it('= 0 for an empty tree', () => {
    const tree = getTree(0)
    expect(tree.size).toEqual(0)
  })
  it('increases by one on every insert', () => {
    let count = 0
    getTree(100, (tree) => {
      expect(tree.size).toEqual(++count)
    })
  })
  //test('decreases by one on every deletion')
  it('equals the number of elements inserted in the tree', () => {
    const numEl = 2000
    const tree = getTree(numEl)
    expect(tree.size).toEqual(numEl)
  })
}

function testLeaveCount(getTree) {
  const numEl = 600
  it('increases by one on every b+1 insert', () => {
    let prevLeaveCount = void(0)
    let count = 0
    getTree(numEl, (tree) => {
      count++
      if (prevLeaveCount !== void(0)) {
        const b = tree.b
        if (count === (b + 1)) {
          expect(tree.leaveCount).toEqual(prevLeaveCount + 1)
          count = 0
        } else {
          expect(tree.leaveCount).toEqual(prevLeaveCount)
        }
      }
      prevLeaveCount = tree.leaveCount
    })
  })
  //it('decreases by one on every a-1 deletion (assuming that a node was full before deletion)')
  //it('does not decrease on deletion-count >= a (assuming node was full before deletion)')
}

function testHeight(getTree) {
  const numEl = 570
  describe('elements inserted = b + 1', () => {
    it('increases the height', () => {
      let count = 0
      let prevHeight = 0
      getTree(numEl, (tree) => {
        count++
        const b = tree.b
        if (count === b + 1) {
          expect(tree.height).toEqual(prevHeight + 1)
        }
        prevHeight = tree.height
      })
    })
  })
}
