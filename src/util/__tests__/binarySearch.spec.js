const binarySearch = require('../binarySearch')

describe('binarySearch', () => {
  describe('when item is in the list', () => {
    it('should return the index of the item', () => {
      const list = [1,2,3,4,5,6,7,8,9,10]
      expect(binarySearch(list, 1)).toEqual(0)
      expect(binarySearch(list, 2)).toEqual(1)
      expect(binarySearch(list, 3)).toEqual(2)
      expect(binarySearch(list, 4)).toEqual(3)
      expect(binarySearch(list, 5)).toEqual(4)
      expect(binarySearch(list, 6)).toEqual(5)
      expect(binarySearch(list, 7)).toEqual(6)
      expect(binarySearch(list, 8)).toEqual(7)
      expect(binarySearch(list, 9)).toEqual(8)
      expect(binarySearch(list, 10)).toEqual(9)
    })
  })
  describe('when item is not in the list', () => {
    it('should return the index where the element would be inserted', () => {
      const list = [2,4,6,8,10,12,14,16,18]
      expect(binarySearch(list, 1)).toEqual(0)
      expect(binarySearch(list, 3)).toEqual(1)
      expect(binarySearch(list, 5)).toEqual(2)
      expect(binarySearch(list, 7)).toEqual(3)
      expect(binarySearch(list, 9)).toEqual(4)
      expect(binarySearch(list, 11)).toEqual(5)
      expect(binarySearch(list, 13)).toEqual(6)
      expect(binarySearch(list, 15)).toEqual(7)
      expect(binarySearch(list, 17)).toEqual(8)
      expect(binarySearch(list, 19)).toEqual(9)
    })
    it('should return 0 for an empty list', () => {
      const list = []
      expect(binarySearch(list, 0)).toEqual(0)
    })
  })
})
