xdescribe('HeightBalancedLeafTree', () => {
  describe('properties', () => {
    const leaveCountForBalancedTree = '(3+√5 / 2√5)(1+√5 / 2)^h - (3-√5 / 2√5)(1-√5 / 2)^h'
    test('if leaveCount = N; height <= 1.44logN')
    test(`if height = h; leaveCount >= ${ leaveCountForBalancedTree }`)
  })
  describe('#insert', () => {
    it('returns false if insertion failed (like when the key already exists in the tree)')
    it('returns true if insertion succeeded')
    it('maintains tree balance criteria')
  })
  describe('#delete', () => {
    it('returns true if deletion succeeded')
    it('returns false if deletion failed (like if tree is empty)')
    it('returns false if deletion failed (like when key does not exist in the tree)')
    it('maintains tree balance criteria')
  })
})
