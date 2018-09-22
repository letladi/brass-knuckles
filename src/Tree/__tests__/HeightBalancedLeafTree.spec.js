const {
  populateInOrder,
  populateInReverseOrder,
  populateInRandomOrder,
} = require('./util')
const util = require('../treeUtils')
const Tree = require('../HeightBalancedLeafTree')

describe('HeightBalancedLeafTree', () => {
  describe('properties', () => {
    describe('when elements are inserted with increasing key order', () => {
      testTreeProperties((numElements = 200) => {
        const tree = new Tree()
        populateInOrder(tree, numElements)
        return tree
      })
    })
    describe('when elements are inserted with decreasing key order', () => {
      testTreeProperties((numElements = 200) => {
        const tree = new Tree()
        populateInReverseOrder(tree, numElements)
        return tree
      })
    })
    describe('when elements are inserted with random key order', () => {
      testTreeProperties((numElements = 200) => {
        const tree = new Tree()
        populateInRandomOrder(tree, numElements)
        return tree
      })
    })
  })

  describe('#insert', () => {
    describe('when elements are inserted with increasing key order', () => {
      testInsertion((numElements) => {
        const tree = new Tree()
        populateInOrder(tree, numElements)
        return tree
      })
    })
    describe('when elements are inserted with decreasing key order', () => {
      testInsertion((numElements) => {
        const tree = new Tree()
        populateInReverseOrder(tree, numElements)
        return tree
      })
    })
    describe('when elements are inserted with random key order', () => {
      testInsertion((numElements) => {
        const tree = new Tree()
        populateInRandomOrder(tree, numElements)
        return tree
      })
    })
  })
  describe('#delete', () => {
    describe('when elements are inserted with increasing key order', () => {
      testDeletion((numElements) => {
        const tree = new Tree()
        populateInOrder(tree, numElements)
        return tree
      })
    })
    describe('when elements are inserted with decreasing key order', () => {
      testDeletion((numElements) => {
        const tree = new Tree()
        populateInReverseOrder(tree, numElements)
        return tree
      })
    })
    describe('when elements are inserted with random key order', () => {
      testDeletion((numElements) => {
        const tree = new Tree()
        populateInRandomOrder(tree, numElements)
        return tree
      })
    })
  })
})

const computeMinimumLeaveCount = height => {
  const sqrt5 = Math.sqrt(5)
  const sqrt2 = Math.sqrt(2)
  const doubleOfSqrt5 = sqrt5 * 2

  const x = ((3 + sqrt5) / doubleOfSqrt5) * (((1 + sqrt5) / 2) ** height)
  const y = ((3 - sqrt5) / doubleOfSqrt5) * (((1 - sqrt5) / 2) ** height)
  return x - y
}
const computeMaxHeight = leaveCount => {
  const sqrt5 = Math.sqrt(5)
  const CFib = 1 / Math.log2((1 + sqrt5) / 2)
  return Math.ceil(CFib * Math.log2(leaveCount))
}

function testTreeProperties(getTree) {
  const leaveCountForBalancedTree = '(3+√5 / 2√5)(1+√5 / 2)^h - (3-√5 / 2√5)(1-√5 / 2)^h'
  test('if leaveCount = N; height <= approx. 1.44logN', () => {
    const numLeaves = 50
    const tree = getTree(numLeaves)
    expect(numLeaves).toEqual(tree.leaveCount)
    expect(tree.height).toBeLessThanOrEqual(computeMaxHeight(tree.leaveCount))
  })
  test(`if height = h; leaveCount >= ${ leaveCountForBalancedTree }`, () => {
    const tree = getTree()
    expect(tree.leaveCount).toBeGreaterThanOrEqual(computeMinimumLeaveCount(tree.height))
  })
}

function testInsertion(getTree) {
  const numEl = 100
  it('returns false if insertion failed (like when the key already exists in the tree)', () => {
    const tree =  getTree(numEl)
    expect(tree.insert(5, 'five')).toEqual(false)
  })
  it('returns true if insertion succeeded', () => {
    const tree = getTree(numEl)
    const nextElKey = numEl + 1
    expect(tree.insert(nextElKey, 'eleven')).toEqual(true)
  })
  testKeyOrder(() => getTree(numEl))
  testBalanceCriteria(() => getTree(numEl))
}



function testDeletion(getTree) {
  const numEl = 200
  const keyToDelete = Math.floor(numEl / 2)
  it('returns null if deletion failed (when tree is empty)', () => {
    const tree = getTree(0)
    expect(tree.delete(1)).toEqual(null)
  })
  it('returns null if deletion failed (when the key does not exist in the tree)', () => {
    const tree = getTree(numEl)
    const nextElKey = numEl + 1
    expect(tree.delete(nextElKey)).toEqual(null)
  })
  it('returns the deleted value if deletion succeeded', () => {
    const tree = getTree(numEl)
    const expectedDeletedValue = keyToDelete * 2 // generateKeysAndValues/util.js
    expect(tree.delete(keyToDelete)).toEqual(expectedDeletedValue)
  })
  it('decreases the leaveCount by one', () => {
    const tree = getTree(numEl)
    const oldLeaveCount = tree.leaveCount
    tree.delete(keyToDelete)
    const expectedLeaveCount = tree.leaveCount
    expect(expectedLeaveCount).toEqual(oldLeaveCount - 1)
  })
  it('decreases the nodeCount by two', () => {
    const tree = getTree(numEl)
    const oldNodeCount = tree.nodeCount
    tree.delete(keyToDelete)
    expect(tree.nodeCount).toEqual(oldNodeCount - 2)
  })
  testKeyOrder(
    () => getTree(numEl),
    (tree) => {
    let numKeysToDelete = Math.floor(numEl / 4)
    while (numKeysToDelete--) tree.delete(numKeysToDelete)
  })
  testBalanceCriteria(
    () => getTree(numEl),
    (tree) => {
      let numKeysToDelete = Math.floor(numEl / 4)
      while (numKeysToDelete--) tree.delete(numKeysToDelete)
    })
}

function testKeyOrder(getTree, beforeVerification = (tree) => tree) {
  it('maintains order of the keys', () => {
    const tree = getTree()
    beforeVerification(tree)
    tree.traverse((node) => {
      if (!node.isLeaf()) {
        const rKey = node.right.key
        const lKey = node.left.key
        expect(lKey).toBeLessThan(node.key)
        expect(node.key).toBeLessThanOrEqual(rKey)
      }
    })
  })
}

function testBalanceCriteria(getTree, beforeVerification = (tree) => tree) {
  it('maintains tree balance criteria', () => {
    const tree = getTree()
    beforeVerification(tree)
    tree.traverse((node) => {
      if (!node.isLeaf()) {
        const rHeight = util.height(node.right)
        const lHeight = util.height(node.left)
        const balanceFactor = Math.abs(lHeight - rHeight)
        expect(balanceFactor).toBeLessThan(2)
      } else {
        expect(util.height(node)).toEqual(0)
      }
    })
  })
}
