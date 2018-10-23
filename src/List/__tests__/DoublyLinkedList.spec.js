const DoublyLinkedList = require('../DoublyLinkedList')

describe('DoublyLinkedList', () => {
    let list = null
    beforeEach(() => list = new DoublyLinkedList())
    afterEach(() => list = null)

    test('#insert, inserts elements in order', () => {
        const nums = [10, 5, 0, -5, 20, 15]
        nums.forEach((el) => list.insert(el))
        expect(list.entries()).toEqual([-5, 0, 5, 10, 15, 20])
    })

    describe('#search', () => {
        test('returns true if the element is in the list', () => {
            const nums = [10, 5, 0, -5, 20, 15]
            nums.forEach((el) => list.insert(el))
            expect(list.search(-5)).toEqual(true)
        })
        test('returns false if the element is not in the list', () => {
            const nums = [10, 5, 0, -5, 20, 15]
            nums.forEach((el) => list.insert(el))
            expect(list.search(-25)).toEqual(false)
        })
    })

    describe('#delete', () => {
        test('should remove element from the list', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insert(el))
            expect(list.search(3)).toEqual(true)
            list.delete(3)
            expect(list.search(3)).toEqual(false)
        })
        test('should return true if element was deleted', () => {
            list.insert(1)
            expect(list.delete(1)).toEqual(true)
        })
        test('should return false if element was not deleted', () => {
            list.insert(1)
            expect(list.delete(11)).toEqual(false)
        })
    })
})
