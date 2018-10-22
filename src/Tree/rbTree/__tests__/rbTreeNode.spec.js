const Node = require('../rbTreeNode')
describe('rbTreeNode', () => {
let node = null
  beforeEach(() => {
    node = new Node()
  })
  describe('construction', () => {
    it('is red by default', () => {
      expect(node.isRed).toEqual(true)
      expect(node.isBlack).toEqual(false)
    })
  })

  describe('#isRed', () => {
    it('is true if node is red', () => {
      expect(node.isRed).toEqual(true)
    })
    it('is false if node is not red', () => {
      node.turnBlack()
      expect(node.isRed).toEqual(false)
    })
  })

  describe('#isBlack', () => {
    it('is true if node is black', () => {
      node.turnBlack()
      expect(node.isBlack).toEqual(true)
    })
    it('is false if node is not black', () => {
      node.turnRed()
      expect(node.isBlack).toEqual(false)
    })
  })

  describe('#turnRed', () => {
    it('makes a node red', () => {
      node.turnBlack()
      expect(node.isBlack).toEqual(true)
      node.turnRed()
      expect(node.isRed).toEqual(true)
      expect(node.isBlack).toEqual(false)
    })
  })

  describe('#turnBlack', () => {
    it('makes a node black', () => {
      node.turnRed()
      expect(node.isBlack).toEqual(false)
      node.turnBlack()
      expect(node.isBlack).toEqual(true)
      expect(node.isRed).toEqual(false)
    })
  })
})
