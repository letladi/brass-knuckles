const OrderedLinkedList = require('../OrderedLinkedList')

describe('OrderedLinkedList', () => {
    let list = null
    beforeEach(() => list = new OrderedLinkedList())
    afterEach(() => list = null)

    describe('#insert', () => {
        test('should insert elements in sorted order', () => {
            const nums = [20, 15, 22, -5, 10]
            nums.forEach((el) => list.insert(el))
            expect(list.entries()).toEqual([-5, 10, 15, 20, 22])
        })
        test('should not allow duplicates', () => {
            const nums = [20, 20, 15, 22, 20, -5, 10, 15]
            nums.forEach((el) => list.insert(el))
            expect(list.entries()).toEqual([-5, 10, 15, 20, 22])
        })
        test('should return true if insertion succeeded', () => {
            expect(list.insert(1)).toEqual(true)
        })
        test('should return false if insertion failed', () => {
            list.insert(3)
            list.insert(1)
            expect(list.insert(3)).toEqual(false)
        })
    })

    describe('#insertFirst', () => {
        test('should insert elements in sorted order', () => {
            const nums = [20, 15, 22, -5, 10]
            nums.forEach((el) => list.insertFirst(el))
            expect(list.entries()).toEqual([-5, 10, 15, 20, 22])
        })
    })

    describe('#insertLast', () => {
        test('should insert elements in sorted order', () => {
            const nums = [20, 15, 22, -5, 10]
            nums.forEach((el) => list.insertLast(el))
            expect(list.entries()).toEqual([-5, 10, 15, 20, 22])
        })
    })

    describe('#delete', () => {
        test('removes an item from the list', () => {
            const nums = [20, 15, 22, -5, 10]
            nums.forEach((el) => list.insertLast(el))
            expect(list.entries()).toEqual([-5, 10, 15, 20, 22])
            expect(list.delete(15)).toEqual(true)
            expect(list.entries()).toEqual([-5, 10, 20, 22])
        })
    })

    describe('#merge', () => {
        test('case where first list is empty, return elements in the second lists', () => {
            const nums = [1, 2, 3]
            const list2 = new OrderedLinkedList()
            nums.forEach((el) => list2.insert(el))
            const list3 = list.merge(list2)
            expect(list3.entries()).toEqual([1, 2, 3])

        })
        test('case where second list is empty, return all the elements in the first list', () => {
            const nums = [1, 2, 3]
            const list2 = new OrderedLinkedList()
            nums.forEach((el) => list.insert(el))
            const list3 = list.merge(list2)
            expect(list3.entries()).toEqual([1, 2, 3])
        })
        test('case where both lists are empty, return an empty list', () => {
            const list2 = new OrderedLinkedList()
            const list3 = list.merge(list2)
            expect(list3.isEmpty()).toEqual(true)
        })
        test('should return a new list with elements from both lists in order', () => {
            const list2 = new OrderedLinkedList()
            const nums1 = [2, 6, 7]
            const nums2 = [3, 5, 8]
            nums1.forEach((el) => list.insert(el))
            nums2.forEach((el) => list2.insert(el))
            const list3 = list.merge(list2)
            expect(list3.entries()).toEqual([2, 3, 5, 6, 7, 8])
        })
    })
})
