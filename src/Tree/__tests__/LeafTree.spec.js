const {
  valueGenerator,
  testWithDifferentKeyInsertionOrders,
} = require('./util')
const {
  height,
  leaveCount,
  nodeCount,
  averageDepth,
  interiorNodeCount,
} =  require('../treeUtils')
const LeafTree = require('../LeafTree')
const Node = require('../LeafTreeNode')

describe('LeafTree', () => {
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, LeafTree)
  })

  performGenericLeafTreeTests(LeafTree)
})

function performGenericLeafTreeTests(TreeConstructor) {
  describe('height()', () => {
    testWithDifferentKeyInsertionOrders(testTreeHeight, LeafTree)
  })

  describe('averageDepth() (of the leaves)', () => {
    testWithDifferentKeyInsertionOrders(testAverageDepth, LeafTree)
  })

  describe('#find', () => {
    testWithDifferentKeyInsertionOrders(testFind, TreeConstructor)
  })

  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, TreeConstructor)
  })

  xdescribe('#set', () => {
    testWithDifferentKeyInsertionOrders(testSetMethod, TreeConstructor)
  })

  describe('leaveCount()', () => {
    testWithDifferentKeyInsertionOrders(testLeaveCount, TreeConstructor)
  })

  describe('nodeCount()', () => {
    testWithDifferentKeyInsertionOrders(testNodeCount, TreeConstructor)
  })

  describe('#delete', () => {
    testWithDifferentKeyInsertionOrders(testDeletion, TreeConstructor)
  })

  describe('#intervalFind', () => {
    testWithDifferentKeyInsertionOrders(testIntervalFind, TreeConstructor)
  })
}

module.exports = performGenericLeafTreeTests

function testTreeProperties(getTree) {
  const numEl = 100
  test('if height = h; leaveCount <= 2**h', () => {
    const tree = getTree(numEl)
    const h = height(tree)
    expect(leaveCount(tree)).toBeLessThanOrEqual(2**h)
  })
  test('if height = h; leaveCount >= h + 1', () => {
    const tree = getTree(numEl)
    const h = height(tree)
    expect(leaveCount(tree)).toBeGreaterThanOrEqual(h + 1)
  })
  test('if interiorNodeCount = h; leaveCount = h + 1', () => {
    const tree = getTree(numEl)
    expect(interiorNodeCount(tree)).toEqual(leaveCount(tree) - 1)
  })
}

function testSetMethod(getTree) {
  const numEl = 2000
  it('replaces a key value with a new one', () => {
    const tree = getTree(numEl)
    const keyToReplace = Math.floor(numEl / 2)
    const newVal = 'new-value'
    tree.set(keyToReplace, newVal)
    expect(tree.find(keyToReplace)).toEqual(newVal)
  })
  it('inserts a key value if it does exist', () => {
    const tree = getTree(numEl)
    const newKey = numEl + 1
    const newVal = valueGenerator(newKey)
    tree.set(newKey, newVal)
    expect(tree.find(newKey)).toEqual(newVal)
  })
}

function testFind(getTree) {
  it('returns null if the tree is empty', () => {
    const tree = getTree(0)
    expect(tree.find(1)).toEqual(null)
  })
  it('returns null if the a value associated with the query key is not in the tree', () => {
    const tree = getTree(10)
    const nextKey = 10 + 1
    expect(tree.find(nextKey)).toEqual(null)
  })
  it('returns the value associated with the query key if it exists in the tree', () => {
    const numEl = 100
    const tree = getTree(numEl)
    for (let key = 1; key <= numEl; key++) {
      expect(tree.find(key)).toEqual(valueGenerator(key))
    }
  })
}

function testTreeHeight(getTree) {
  const numEl = 20
  it('should be >= Math.ceil(log n)', () => {
    const tree = getTree(numEl)
    const logN = Math.log2(nodeCount(tree))
    expect(height(tree)).toBeGreaterThanOrEqual(Math.ceil(logN))
  })
  it('should be <= n - 1', () => {
    const tree = getTree(numEl)
    const n = nodeCount(tree)
    expect(height(tree)).toBeLessThanOrEqual(n - 1)
  })
}

function testLeaveCount(getTree) {
  it('is 0 if empty', () => {
    const tree = getTree()
    expect(leaveCount(tree)).toEqual(0)
  })
  it('counts the number of leaves in the tree', () => {
    const numEl = 10
    const tree = getTree(numEl)
    expect(leaveCount(tree)).toEqual(numEl)
  })
}

function testInsertion(getTree) {
  const numEl = 20
  it('returns false (fails) if we attempt to insert a key that already exists in the tree', () => {
    const tree = getTree(numEl)
    const existingKey = Math.floor(numEl / 2)
    expect(tree.insert(existingKey, 'existingKey')).toEqual(false)
  })
  it('returns true if insertion succeeded', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    expect(tree.insert(nextKey, 'nextKey')).toEqual(true)
  })
  it('should be able to insert in empty tree', () => {
    const tree = getTree(0)
    tree.insert(1, 'one')
    expect(tree.isEmpty()).toEqual(false)
  })
  it('increases the leaveCount of the tree by one', () => {
    let count = 0
    getTree(numEl, (tree) => {
      expect(leaveCount(tree)).toEqual(++count)
    })
  })
  it('increases the nodeCount of the tree by one on the first insert', () => {
    const tree = getTree(1)
    expect(nodeCount(tree)).toEqual(1)
  })
  it('increases the nodeCount by two after the first insert', () => {
    let count = 0
    let oldNodeCount = 0
    getTree(numEl, (tree) => {
      if (count) {
        expect(nodeCount(tree)).toEqual(oldNodeCount + 2)
      }
      oldNodeCount = nodeCount(tree)
      count++
    })
  })
  it('all the key value pairs inserted will exist in the tree', () => {
    let keyCount = numEl
    const tree = getTree(keyCount)
    while (keyCount) expect(tree.find(keyCount--)).not.toEqual(null)
  })
}

function testNodeCount(getTree) {
  const numEl = 20
  it('is 0 if empty', () => {
    const tree = getTree(0)
    expect(nodeCount(tree)).toEqual(0)
  })
  it('increases by one on the very first insert', () => {
    const tree = getTree(1)
    expect(nodeCount(tree)).toEqual(1)
  })
  it('increases by two after every subsequent insert', () => {
    let count = 0
    let oldNodeCount = 0
    getTree(numEl, (tree) => {
      if (count) {
        expect(nodeCount(tree)).toEqual(oldNodeCount + 2)
      }
      count++
      oldNodeCount = nodeCount(tree)
    })
  })
}

function testDeletion(getTree) {
  const numEl = 100
  it('returns null is deletion failed (when tree is empty)', () => {
    const tree = getTree(0)
    expect(tree.delete(1)).toEqual(null)
  })
  it('returns null if deletion failed (when key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextKey = numEl + 1
    expect(tree.delete(nextKey)).toEqual(null)
  })
  it('returns and removes the value associated with the deleted key', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    while (numKeysToDelete) {
      expect(tree.delete(numKeysToDelete)).toEqual(valueGenerator(numKeysToDelete))
      numKeysToDelete--
    }
  })
  it('decreases leaveCount by 1', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    let oldLeaveCount = leaveCount(tree)
    while (numKeysToDelete) {
      tree.delete(numKeysToDelete--)
      expect(leaveCount(tree)).toEqual(oldLeaveCount - 1)
      oldLeaveCount = leaveCount(tree)
    }
  })
  it('decreases nodeCount by two', () => {
    let numKeysToDelete = Math.floor(numEl / 20)
    const tree = getTree(numEl)
    let oldNodeCount = nodeCount(tree)
    while (numKeysToDelete) {
      tree.delete(numKeysToDelete--)
      expect(nodeCount(tree)).toEqual(oldNodeCount - 2)
      oldNodeCount = nodeCount(tree)
    }
  })
}

function testIntervalFind(getTree) {
  const numEl = 100
  it('returns a type of linked list of the pointers in the interval', () => {
    const tree = getTree(numEl)
    const intervalStart = Math.floor(numEl / 10)
    const intervalEnd = intervalStart + 10

    let interval = tree.intervalFind(intervalStart, intervalEnd)
    let key = intervalStart
    while (key < intervalEnd) {
      expect(interval.key).toEqual(key)
      expect(interval.value).toEqual(valueGenerator(key))
      interval = interval.right
      key++
    }
  })
  it('returns null if there are no elements in the specified interval', () => {
    const tree = getTree(numEl)
    const intervalStart = numEl + 10
    const intervalEnd = intervalStart + 10
    expect(tree.intervalFind(intervalStart, intervalEnd)).toEqual(null)
  })
  it('excludes elements equal to the closing interval key', () => {
    const tree = getTree(Math.floor(numEl))
    const interval = tree.intervalFind(50, 51)
    expect(interval.right).toEqual(null)
  })
}

function testAverageDepth(getTree) {
  const numEl = 2000
  it('should be <= (n - 1)(n + 2) / 2n (approx. 0.5n)', () => {
    const tree = getTree(numEl)
    expect(averageDepth(tree)).toBeLessThanOrEqual(calculateMaxAverageDepth(leaveCount(tree)))
  })
  it('should be >= log(n)', () => {
    const tree = getTree(numEl)
    expect(averageDepth(tree)).toBeGreaterThanOrEqual(calculateMinAverageDepth(leaveCount(tree)))
  })
}

function calculateMaxAverageDepth(leaveCount) {
  return (leaveCount - 1) * (leaveCount + 2) / (2 * leaveCount)
}

function calculateMinAverageDepth(leaveCount) {
  return Math.log2(leaveCount)
}
