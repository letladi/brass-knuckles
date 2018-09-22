xdescribe('WeightBalancedLeafTree', () => {
  describe('tree properties', () => {
    test('if h >= 2; leaveCount >= (1 / 1-α)^h')
    test('if leaveCount = 2; height <= log(1 / 1-α)n = (1 / log2(1 / 1-α)) * log2n')
  })
  describe('#insert', () => {
    it('returns true if insertion succeeded')
    it('returns false if insertion failed (like when key already exists in the tree)')
    it('maintains tree balance criteria')
  })
  describe('#delete')
})
