const util = require('./index')

describe('utilities', () => {
  describe('isNull()', () => {
    it('returns true when the argument is null', () => {
      expect(util.isNull(null)).toEqual(true)
    })
    it('returns false when the argument is not null', () => {
      const notNullValues = [0, '', undefined, 'null', 5, {}, NaN]
      notNullValues.forEach((val) => {
        expect(util.isNull(val)).toEqual(false)
      })
    })
  })
  describe('isEven()', () => {
    it('is true for even integers', () => {
      [0, 2, 4, 6].forEach((evenNum) => expect(util.isEven(evenNum)).toEqual(true))
    })
    it('false for odd integers', () => {
      [1, 3, 5, 7].forEach((oddNum) => expect(util.isEven(oddNum)).toEqual(false))
    })
  })
})
