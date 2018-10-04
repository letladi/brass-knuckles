const util = require('../index')

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
})
