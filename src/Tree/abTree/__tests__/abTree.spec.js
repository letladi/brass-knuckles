const abTree = require('../abTree')
const {
  valueGenerator,
  testWithDifferentKeyInsertionOrders
} = require('../../__tests__/util')

describe('abTree', () => {
  it('does not allow b to be less than 2a when constructing tree', () => {
    expect(() => new abTree(500, 900)).toThrow()
  })
  xdescribe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, abTree)
  })
  describe('#find', () => {
    testWithDifferentKeyInsertionOrders(testFind, abTree)
  })
  xdescribe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, abTree)
  })
  xdescribe('#describe', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, abTree)
  })
  xdescribe('.size', () => {
    testWithDifferentKeyInsertionOrders(testSizeProperty, abTree)
  })
  xdescribe('#traverse', () => {
    testWithDifferentKeyInsertionOrders(testTraversal, abTree)
  })
  xdescribe('.leaveCount', () => {
    testWithDifferentKeyInsertionOrders(testLeaveCount, abTree)
  })
})

const leaveCountMin = (height, a) => 2 * a ** (height - 1)
const leaveCountMax = (height, b) => b ** height
const approximateHeightMax = (leaveCount, a) => (1 / Math.log2(a)) * Math.log2(leaveCount)

function testTreeProperties(getTree) {
  const numEl = 200000
  const formulaForMaxHeightGivenLeaveCount = 'Math.ceil(loga(n) + (1 - loga2)) (approx. [1/log2(a))log2(n)]'

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
    expect(tree.height).toBeLessThanOrEqual(approximateHeightMax(tree.leaveCount))
  })
}

function testFind(getTree) {
  const numEl = 200000
  it('returns the key value if it exists', () => {
    const tree = getTree(numEl)
    const keyToSearch = Math.floor(numEl / 2)
    expect(tree.find(keyToSearch)).toEqual(valueGenerator(keyToSearch))
    // while (keyToSearch) {
    //   expect(tree.find(keyToSearch)).toEqual(valueGenerator(keyToSearch))
    //   keyToSearch--
    // }
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
      it('leaveCount = 1', () => {

      })
      it('elements = number of elements inserted')
    })
    describe('elements inserted = b (splits root)', () => {
      it('increases the leaveCount')
      it('increases the height')
      it('values are contained only in the leaves')
      it('maintains key order')
    })
  })
  it('increases the leaveCount on every (b + 1)-th insert')
  it('increases the height on every (b + 1)x(b + 1)-th insert')
  testTreeStructure(getTree)
}

function testDeletion(getTree) {
  it('returns null if deletion failed (when tree is empty)')
  it('returns null if deletion failed (when key does not exist in the tree)')
  it('returns and removes the value associated with the deleted key')
  it('does not decrease nodeCount if number of values >= "a" after deletion from a node')
  it('decreases nodeCount if number of values < "a" after deletion from a node')
  it('should maintain requirement of number of values >= a in each node')
  it('should maintain requirement of number of values <= b in each node')
  testTreeStructure(getTree)
}

function testTraversal(getTree) {
  it('only traverses the leaves of the tree')
  it('order of callback arguments is (key, value, indexInTheNode, node, tree)')
  it('node of the callback is immutable')
}

function testTreeStructure(getTree) {
  test('key order is maintained')
  test('maintains order between keys and their next nodes')
  test('all leaves on the same depth')
  test('non-root node degree >= a')
  test('non-root node degree <= b')
  test('root node degree >= 2')
  test('root node degree <= b')
}

function testSizeProperty(getTree) {
  it('= 0 for an empty tree')
  it('increases by one on every insert')
  it('decreases by one on every deletion')
  it('equals the number of elements inserted in the tree')
}

function testLeaveCount(getTree) {
  it('increases by one on every b+1 insert')
  it('does not increase by one on insert-count <= b')
  it('decreases by one on every a-1 deletion (assuming that a node was full before deletion)')
  it('does not decrease on deletion-count >= a (assuming node was full before deletion)')
}
