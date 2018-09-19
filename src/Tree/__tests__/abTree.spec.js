xdescribe('abTree', () => {
  describe('tree properties', () => {
    const formulaForMaxHeightGivenLeaveCount = 'Math.ceil(loga(n) + (1 - loga2)) (approx. [1/log2(a))log2(n)]'
    test('if height = h >= 1; leaveCount >= 2a^(h-1)')
    test('if height = h >= 1; leaveCount <= b^h')
    test(`if leaveCount = n >= 2; height <= ${formulaForMaxHeightGivenLeaveCount}`)
  })
})
