const abTree = require('../abTree')
const {
  valueGenerator,
  testWithDifferentKeyInsertionOrders
} = require('./util')
xdescribe('abTree', () => {
  describe('tree properties', () => {
    testWithDifferentKeyInsertionOrders(testTreeProperties, abTree)
  })
  describe('#find', () => {
    testWithDifferentKeyInsertionOrders(testFind, abTree)
  })
  describe('#insert', () => {
    testWithDifferentKeyInsertionOrders(testInsertion, abTree)
  })
})

const leaveCountMin = (height, a) => 2 * a ** (height - 1)
const leaveCountMax = (height, b) => b ** height
const approximateHeightMax = (leaveCount, a) => (1 / Math.log2(a)) * Math.log2(leaveCount)

function testTreeProperties(getTree) {
  const numEl = 100
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
  const numEl = 100
  it('returns the key value if it exists', () => {
    const tree = getTree(numEl)
    const keyToSearch = Math.floor(numEl / 2)
    expect(tree.find(keyToSearch)).toEqual(valueGenerator(keyToSearch))
  })
  it('returns null if the key value does not exist', () => {
    const tree = getTree(numEl)
    const missingKey = numEl + 10
    expect(tree.find(missingKey)).toEqual(null)
  })
}

function testInsertion(getTree) {
  it('returns true if insertion succeeds')
  it('returns false if insertion fails (like when there is a duplicate)')
  describe('insertion from the beginning', () => {
    describe('elements inserted < b', () => {
      it('leaveCount = 1')
      it('elements = number of elements inserted')
    })
    describe('elements inserted >= b (splits root)', () => {
      it('increases the leaveCount')
      it('increases the height')
      it('values are contained only in the leaves')
      it('maintains key order')
    })
  })
  it('increases the leaveCount on every b-th insert')
  it('increases the height on every bxb-th insert')
}
