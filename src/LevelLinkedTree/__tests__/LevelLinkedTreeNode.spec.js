const Node = require('../LevelLinkedTreeNode')

describe('LevelLinkedTreeNode', () => {
  describe('#unlinkFromLevel', () => {
    const left = new Node()
    const right = new Node()
    const node = new Node()

    node.linkLeft(left)
    node.linkRight(right)

    node.unlinkFromLevel()
    expect(node.levelLeft).toBeNull()
    expect(node.levelRight).toBeNull()
    expect(left.levelRight).toBeNull()
    expect(right.levelLeft).toBeNull()
  })
  describe('#linkLeft', () => {
    const node = new Node()
    const left = new Node()
    expect(node.levelLeft).toBeNull()
    node.linkLeft(left)
    expect(node.levelLeft).toEqual(left)
    expect(left.levelRight).toEqual(node)
  })
  describe('#linkRight', () => {
    const node = new Node()
    const right = new Node()
    expect(node.levelRight).toBeNull()
    node.linkRight(right)
    expect(node.levelRight).toEqual(right)
    expect(right.levelLeft).toEqual(node)
  })
  describe('#linkParent', () => {
    it('should link node to a parent', () => {
      const parent = new Node()
      const node = new Node()
      expect(node.parent).toBeNull()
      node.linkParent(parent)
      expect(node.parent).toEqual(parent)
    })
  })
  describe('#unlinkParent', () => {
    it('should unlink parent', () => {
      const parent = new Node()
      const node = new Node()
      parent.left = node
      node.linkParent(parent)
      expect(node.parent).toEqual(parent)
      node.unlinkParent()
      expect(node.parent).toBeNull()
    })
  })
})
