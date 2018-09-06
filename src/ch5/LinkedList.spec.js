const LinkedList = require('./LinkedList')

describe('LinkedList Iterator', () => {
    list = new LinkedList()
    list.insertLast(1)
    list.insertLast(2)
    list.insertLast(3)

    test('should iterate the list elements', () => {
        const iterator = list.iterator()
        expect(iterator.next()).toEqual({ value: 1, done: false })
        expect(iterator.next()).toEqual({ value: 2, done: false })
        expect(iterator.next()).toEqual({ value: 3, done: false })
        expect(iterator.next()).toEqual({ done: true })
    })
})

describe('LinkedList', () => {
    let list = null
    beforeEach(() => list = new LinkedList())
    afterEach(() => list = null)

    describe('#insertFirst', () => {
        test('inserts element in front of the list', () => {
            list.insertFirst(10)
            list.insertFirst(20)
            expect(list.front).toEqual(20)
        })
    })

    describe('#insertLast', () => {
        test('inserts element in the back of the list', () => {
            list.insertLast(10)
            list.insertLast(20)
            expect(list.back).toEqual(20)
        })
    })

    describe('#isEmpty', () => {
        test('returns true if empty', () => {
            expect(list.isEmpty()).toEqual(true)
        })
        test('returns false if not empty', () => {
            list.insertLast(22)
            expect(list.isEmpty()).toEqual(false)
        })
    })
    describe('.length', () => {
        test('returns the length of the list', () => {
            expect(list.length).toEqual(0)
            list.insertLast(10)
            expect(list.length).toEqual(1)
            list.insertFirst(22)
            expect(list.length).toEqual(2)
        })
    })

    describe('.front', () => {
        test('returns the first element', () => {
            list.insertFirst(1)
            list.insertFirst(2)
            expect(list.front).toEqual(2)
        })
        test('throws exception if list is empty', () => {
            expect(() => list.front).toThrow(Error)
        })
    })

    describe('.back', () => {
        test('returns the last element', () => {
            list.insertLast(1)
            list.insertLast(2)
            expect(list.back).toEqual(2)
        })
        test('throws exception if list is empty', () => {
            expect(() => list.back).toThrow(Error)
        })
    })

    describe('#each', () => {
        test('should iterate over each element in the list', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            let count = 0
            list.each((el, i) => {
                expect(el).toEqual(nums[count++])
            })
        })
        test('should iterate over each element in the list with the index', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            let count = 0
            list.each((_, i) => {
                expect(i).toEqual(count++)
            })
        })
    })

    describe('#rEach', () => {
        test('should iterate over each element in the list in reverse', () => {
            const nums = [1, 2, 3, 4, 5]
            let count = 4
            nums.forEach((el) => list.insertLast(el))
            list.rEach((el) => {
                expect(el).toEqual(nums[count--])
            })
        })
        test('should iterate over each element in the list in reverse with the index', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            let count = 4
            list.rEach((el, i) => {
                expect(i).toEqual(count)
                expect(el).toEqual(nums[count])
                count--
            })
        })
    })

    describe('#entries', () => {
        test('should return an array containing all list elements', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.entries()).toEqual(nums)
        })
        test('should return entries up to a certain index if an index is given', () => {
          const nums = [1, 2, 3, 4, 5]
          nums.forEach((el) => list.insertLast(el))
          expect(list.entries(0)).toEqual([1])
          expect(list.entries(1)).toEqual([1, 2])
          expect(list.entries(2)).toEqual([1, 2, 3])
          expect(list.entries(3)).toEqual([1, 2, 3, 4])
          expect(list.entries(4)).toEqual([1, 2, 3, 4, 5])
        })
        test('should throw an exception if the index given is out of bounds', () => {
          const nums = [1, 2, 3, 4, 5]
          nums.forEach((el) => list.insertLast(el))
          expect(() => list.entries(-1)).toThrow()
          expect(() => list.entries(5)).toThrow()
        })
    })

    describe('#search', () => {
        test('returns true if element is in list', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.search(4)).toEqual(true)
        })
        test('returns false if element if not in list', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.search(44)).toEqual(false)
        })
    })

    describe('#destroy', () => {
        test('resets list to initial state', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            list.destroy();
            expect(list.isEmpty()).toEqual(true)
        })
    })

    describe('#delete', () => {
        test('should remove element from the list', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.search(3)).toEqual(true)
            list.delete(3)
            expect(list.search(3)).toEqual(false)
        })
        test('should properly re-assign first element', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            list.delete(1)
            expect(list.front).toEqual(2)
        })
        test('should properly re-assign last element', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            list.delete(5)
            expect(list.back).toEqual(4)
        })
        test('should return true if element was deleted', () => {
            list.insertFirst(1)
            expect(list.delete(1)).toEqual(true)
        })
        test('should return false if element was not deleted', () => {
            list.insertFirst(1)
            expect(list.delete(11)).toEqual(false)
        })
        test('should decrement the length if succeeded', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(5)
            list.delete(1)
            expect(list.length).toEqual(4)
        })
        test('should not decrement length if failed', () => {
            const nums = [1, 2, 3, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(5)
            list.delete(6)
            expect(list.length).toEqual(5)
        })
    })

    describe('#deleteMin', () => {
        test('should delete node with smallest info', () => {
            const nums = [1, 2, 3, 0, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMin()
            expect(list.search(0)).toEqual(false)
            expect(list.entries()).toEqual([1, 2, 3, 4, 5])
        })
        test('should delete element if it is the only one in the list', () => {
            list.insertLast(-1)
            list.deleteMin()
            expect(list.search(-1)).toEqual(false)
            expect(list.entries()).toEqual([])
        })
        test('should delete only the first occurrence of the min value', () => {
            const nums = [1, 2, 0, 3, 0, 4, 5, 0]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMin()
            expect(list.search(0)).toEqual(true)
            expect(list.entries()).toEqual([1, 2, 3, 0, 4, 5, 0])
        })
        test('should return the min item if deletion succeeded', () => {
            const nums = [1, 2, 3, 0, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.deleteMin()).toEqual(0)
            expect(list.deleteMin()).toEqual(1)
        })
        test('should properly re-assign first element', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMin()
            expect(list.front).toEqual(1)
        })
        test('should properly re-assing last element', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMin()
            expect(list.back).toEqual(0)
        })
        test('should return false if deletion failed (i.e, when list is empty)', () => {
            expect(list.deleteMin()).toEqual(false)
        })
        test('should decrement the length if succeeded', () => {
            const nums = [1, 2, 3, 0, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(6)
            list.deleteMin()
            expect(list.length).toEqual(5)
        })
        test('should not decrement length is failed', () => {
            expect(list.length).toEqual(0)
            list.deleteMin()
            expect(list.length).toEqual(0)
        })
        test('should be able to delete from an index onwards', () => {
          const nums = [-100, 1, 2, 0, 3, -23, 4, 5, 0, -22]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMin(5)
          expect(list.entries()).toEqual([-100, 1, 2, 0, 3, 4, 5, 0, -22])
        })
        test('should be able to delete from an index onwards (previous minimums are untouched)', () => {
          const nums = [-100, 1, 2, 0, 3, -23, 4, 5, 0, -22]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMin(6)
          expect(list.entries()).toEqual([-100, 1, 2, 0, 3, -23, 4, 5, 0])
        })
        test('should be able to delete from an index onwards (returns false if the index is out of bounds)', () => {
          const nums = [-100, 1, 2, 0, 3, -23, 4, 5, 0, -22]
          nums.forEach((el) => list.insertLast(el))
          expect(list.deleteMin(-1)).toEqual(false)
          expect(list.deleteMin(10)).toEqual(false)
        })
        test('should be able to delete from an index onwards (should work for lists with 2 elements)', () => {
          const nums = [-100, -22]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMin(1)
          expect(list.entries()).toEqual([-100])
        })
        test('should be able to delete from an index onwards (should work for lists with 3 elements)', () => {
          const nums = [-100, -22, 1]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMin(1)
          expect(list.entries()).toEqual([-100, 1])
        })
        test('should be able to delete from an index onwards (should for index = 0)', () => {
          const nums = [-100, -22, 1]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMin(0)
          expect(list.entries()).toEqual([-22, 1])
        })
    })

    describe('#deleteMax', () => {
        test('should delete node with largest info', () => {
            const nums = [1, 2, 3, 0, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMax()
            expect(list.search(5)).toEqual(false)
            expect(list.entries()).toEqual([1, 2, 3, 0, 4])
        })
        test('should delete element if it is the only one in the list', () => {
            list.insertLast(-1)
            list.deleteMax()
            expect(list.search(-1)).toEqual(false)
            expect(list.entries()).toEqual([])
        })
        test('should delete only the first occurrence of the max value', () => {
            const nums = [1, 2, 5, 3, 0, 4, 5, 0]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMax()
            expect(list.search(5)).toEqual(true)
            expect(list.entries()).toEqual([1, 2, 3, 0, 4, 5, 0])
        })
        test('should return the max item if deletion succeeded', () => {
            const nums = [1, 2, 3, 0, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.deleteMax()).toEqual(5)
            expect(list.deleteMax()).toEqual(4)
            expect(list.entries()).toEqual([1, 2, 3, 0])
        })
        test('should properly re-assign first element', () => {
            const nums = [10, 1, 2, 0, 3, 0, 4, 5, 0]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMax()
            expect(list.front).toEqual(1)
        })
        test('should properly re-assing last element', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, 22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteMax()
            expect(list.back).toEqual(0)
        })
        test('should return false if deletion failed (i.e, when list is empty)', () => {
            expect(list.deleteMax()).toEqual(false)
        })
        test('should decrement the length if succeeded', () => {
            const nums = [1, 2, 3, 0, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(6)
            list.deleteMax()
            expect(list.length).toEqual(5)
        })
        test('should not decrement length is failed', () => {
            expect(list.length).toEqual(0)
            list.deleteMax()
            expect(list.length).toEqual(0)
        })
        test('should be able to delete from an index onwards', () => {
          const nums = [100, 1, 2, 0, 3, 23, 4, 5, 0, 22]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMax(5)
          expect(list.entries()).toEqual([100, 1, 2, 0, 3, 4, 5, 0, 22])
        })
        test('should be able to delete from an index onwards (previous maximums are untouched)', () => {
          const nums = [100, 1, 2, 0, 3, 23, 4, 5, 0, 22]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMax(6)
          expect(list.entries()).toEqual([100, 1, 2, 0, 3, 23, 4, 5, 0])
        })
        test('should be able to delete from an index onwards (returns false if the index is out of bounds)', () => {
          const nums = [100, 1, 2, 0, 3, 23, 4, 5, 0, 22]
          nums.forEach((el) => list.insertLast(el))
          expect(list.deleteMax(-1)).toEqual(false)
          expect(list.deleteMax(10)).toEqual(false)
        })
        test('should be able to delete from an index onwards (should work for lists with 2 elements)', () => {
          const nums = [100, 22]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMax(1)
          expect(list.entries()).toEqual([100])
        })
        test('should be able to delete from an index onwards (should work for lists with 3 elements)', () => {
          const nums = [100, 22, 1]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMax(1)
          expect(list.entries()).toEqual([100, 1])
        })
        test('should be able to delete from an index onwards (should for from = 0)', () => {
          const nums = [100, 22, 1]
          nums.forEach((el) => list.insertLast(el))
          list.deleteMax(0)
          expect(list.entries()).toEqual([22, 1])
        })
    })

    describe('#deleteAll', () => {
        test('should delete all occurrences of a given info value', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteAll(0)
            expect(list.search(0)).toEqual(false)
            expect(list.entries()).toEqual([-1, 1, 2, 3, 4, 5, -22])
        })
        test('should return true if deletion occurred', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            expect(list.deleteAll(0)).toEqual(true)
        })
        test('should return false if deletion failed (i.e, element was not in list)', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            expect(list.deleteAll(10)).toEqual(false)
        })
        test('should return false if deletion failed (i.e, list is empty)', () => {
            expect(list.deleteAll(10)).toEqual(false)
        })
        test('should properly re-assign first value', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteAll(-1)
            expect(list.front).toEqual(1)
        })
        test('should properly re-assign last value', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteAll(-22)
            expect(list.back).toEqual(0)
        })
        test('should re-assign first and last value if there are only two items in the list', () => {
            list.insertLast(1)
            list.insertLast(2)
            list.deleteAll(1)
            expect(list.front).toEqual(2)
            expect(list.back).toEqual(2)
        })
        test('should decrement the length if succeeded', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(10)
            list.deleteAll(0)
            expect(list.length).toEqual(7)
        })
        test('should not decrement length is failed', () => {
            const nums = [1, 2, 3, 0, 4, 5]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(6)
            list.deleteAll(7)
            expect(list.length).toEqual(6)
        })
    })

    describe('#at()', () => {
        test('should return the value at the specified index', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            expect(list.at(0)).toEqual(-1)
            expect(list.at(1)).toEqual(1)
            expect(list.at(2)).toEqual(2)
            expect(list.at(3)).toEqual(0)
            expect(list.at(4)).toEqual(3)
            expect(list.at(5)).toEqual(0)
            expect(list.at(6)).toEqual(4)
            expect(list.at(7)).toEqual(5)
            expect(list.at(8)).toEqual(0)
            expect(list.at(9)).toEqual(-22)
        })
        test('returns null if no such index exists', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            expect(list.at(10)).toEqual(null)
            expect(list.at(-1)).toEqual(null)
        })
        test('returns null if list is empty', () => {
            expect(list.at(0)).toEqual(null)
        })
    })

    describe('#deleteAt', () => {
        test('should delete element at the given index', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteAt(5)
            expect(list.entries()).toEqual([-1, 1, 2, 0, 3, 4, 5, 0, -22])
        })
        test('should re-assign first element if it is deleted', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteAt(0)
            expect(list.front).toEqual(1)
        })
        test('should re-assign last element if it is deleted', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.deleteAt(9)
            expect(list.back).toEqual(0)
        })
        test('should re-assign first and last value if there are only two items in the list', () => {
            list.insertLast(1)
            list.insertLast(2)
            list.deleteAt(0)
            expect(list.front).toEqual(2)
            expect(list.back).toEqual(2)
        })
        test('should return true if deletion is successful', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            expect(list.deleteAt(5)).toEqual(true)
        })
        test('should return false if deletion fails - if list is empty', () => {
            expect(list.deleteAt(0)).toEqual(false)
        })
        test('should return false if deletion fails - if index does not exist in list', () => {
            const nums = [-1, 1, 2, 0]
            nums.forEach((el) => list.insertLast(el))
            list.deleteAt(5)
            expect(list.deleteAt(-1)).toEqual(false)
            expect(list.deleteAt(6)).toEqual(false)
        })
        test('should decrement the length if succeeded', () => {
            const nums = [-1, 1, 2, 0]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(4)
            list.deleteAt(0)
            expect(list.length).toEqual(3)
        })
        test('should not decrement length is failed', () => {
            const nums = [-1, 1, 2, 0]
            nums.forEach((el) => list.insertLast(el))
            expect(list.length).toEqual(4)
            list.deleteAt(5)
            expect(list.length).toEqual(4)
        })
    })

    describe('#divideMid', () => {
        test('split list with odd number of elements', () => {
            const nums = [34, 65, 27, 89, 12]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideMid()
            expect(list2.entries()).toEqual([89, 12])
        })
        test('split list with even number of elements', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideMid()
            expect(list2.entries()).toEqual([0, 4, 5, 0, -22])
        })
        test('split list two lists each containing one element for list containing 2 elements', () => {
            const nums = [1, 2]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideMid()
            expect(list2.entries()).toEqual([2])
            expect(list.entries()).toEqual([1])
        })
        test('should properly assign first pointer(s) of both lists', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideMid()
            expect(list.front).toEqual(-1)
            expect(list2.front).toEqual(0)
        })
        test('should properly assign last pointer(s) of both lists', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideMid()
            expect(list.back).toEqual(3)
            expect(list2.back).toEqual(-22)
        })
        test('should return empty list if the first list has only one element', () => {
            const nums = [-1]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideMid()
            expect(list2.isEmpty()).toEqual(true)
        })
        test('should return empty list if the first list is empty', () => {
            const list2 = list.divideMid()
            expect(list2.isEmpty()).toEqual(true)
        })
        test('should properly assign length of first list', () => {
            const nums = [-1, 1, 2, 0, 3, 0, 4, 5, 0, -22]
            nums.forEach((el) => list.insertLast(el))
            list.divideMid()
            expect(list.length).toEqual(5)
        })
    })

    describe('#divideAt', () => {
        test('should return an empty list if the element does not exist in the list', () => {
            const nums = [34, 65, 27, 89, 12]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideAt(22)
            expect(list2.isEmpty()).toEqual(true)
        })
        describe('case where the list has only one element', () => {
            test('should empty the current list', () => {
                list.insertLast(1)
                list.divideAt(1)
                expect(list.isEmpty()).toEqual(true)
            })
            test('should move the item to the current list', () => {
                list.insertLast(1)
                const list2 = list.divideAt(1)
                expect(list2.front).toEqual(1)
            })
        })
        test('should properly adjust the last item of the current list', () => {
            const nums = [34, 65, 27, 89, 12]
            nums.forEach((el) => list.insertLast(el))
            list.divideAt(27)
            expect(list.back).toEqual(65)
        })
        test('should properly adjust the length of the current list', () => {
            const nums = [34, 65, 27, 89, 12]
            nums.forEach((el) => list.insertLast(el))
            list.divideAt(27)
            expect(list.length).toEqual(2)
        })
        it('should return a list all the elements from the given value onwards', () => {
            const nums = [34, 65, 18, 39, 27, 89, 12]
            nums.forEach((el) => list.insertLast(el))
            const list2 = list.divideAt(18)
            expect(list2.entries()).toEqual([18, 39, 27, 89, 12])
        })
        it('should leave all the elements before the given value inside the current list', () => {
            const nums = [34, 65, 18, 39, 27, 89, 12]
            nums.forEach((el) => list.insertLast(el))
            list.divideAt(18)
            expect(list.entries()).toEqual([34, 65])
        })
    })

    describe('#quickSort', () => {
      test('#quickSort({ 34->67->23->12->78->56->36->79->5->32->66 }) = { 5->12->23->32->34->36->56->66->67->78->79 }', () => {
          const nums = [34, 67, 23, 12, 78, 56, 36, 79, 5, 32, 66]
          nums.forEach((el) => list.insertLast(el))
          list.quickSort()
          expect(list.entries()).toEqual([5, 12, 23, 32, 34, 36, 56, 66, 67, 78, 79])
      })
      test('#quickSort({ 13->7->15->8->12->30->3->20 }) = { 3->7->8->12->13->15->20->30 }', () => {
          const nums = [13, 7, 15, 8, 12, 30, 3, 20]
          nums.forEach((el) => list.insertLast(el))
          list.quickSort()
          expect(list.entries()).toEqual([3, 7, 8, 12, 13, 15, 20, 30])
      })
      test('#quickSort({ 10->18->25->30->23->17->45->35 }) = { 10->17->18->23->25->30->35->45 }', () => {
          const nums = [10, 18, 25, 30, 23, 17, 45, 35]
          nums.forEach((el) => list.insertLast(el))
          list.quickSort()
          expect(list.entries()).toEqual([10, 17, 18, 23, 25, 30, 35, 45])
      })
    })

    describe('#swap', () => {
      test('{ List: 1->2->3->4->5 } : swap(0, 4) = { List: 5->2->3->4->1 }', () => {
        const nums = [1,2,3,4,5]
        nums.forEach((el) => list.insertLast(el))
        list.swap(0, 4)
        expect(list.entries()).toEqual([5,2,3,4,1])
      })
      test('should throw exception if either one of the indices (or both) indices are out of bounds', () => {
        const nums = [1,2,3,4,5]
        nums.forEach((el) => list.insertLast(el))
        expect(() => list.swap(-1, 3)).toThrow()
        expect(() => list.swap(-1,5)).toThrow()
        expect(() => list.swap(3, -1)).toThrow()
      })
    })

    describe('#quickSort', () => {
      test('#quickSort({ 34->67->23->12->78->56->36->79->5->32->66 }) = { 5->12->23->32->34->36->56->66->67->78->79 }', () => {
          const nums = [34, 67, 23, 12, 78, 56, 36, 79, 5, 32, 66]
          nums.forEach((el) => list.insertLast(el))
          list.quickSort()
          expect(list.entries()).toEqual([5, 12, 23, 32, 34, 36, 56, 66, 67, 78, 79])
      })
      test('#quickSort({ 13->7->15->8->12->30->3->20 }) = { 3->7->8->12->13->15->20->30 }', () => {
          const nums = [13, 7, 15, 8, 12, 30, 3, 20]
          nums.forEach((el) => list.insertLast(el))
          list.quickSort()
          expect(list.entries()).toEqual([3, 7, 8, 12, 13, 15, 20, 30])
      })
      test('#quickSort({ 10->18->25->30->23->17->45->35 }) = { 10->17->18->23->25->30->35->45 }', () => {
          const nums = [10, 18, 25, 30, 23, 17, 45, 35]
          nums.forEach((el) => list.insertLast(el))
          list.quickSort()
          expect(list.entries()).toEqual([10, 17, 18, 23, 25, 30, 35, 45])
      })
    })

    describe('#partition', () => {
      test('should return the partition index', () => {
        const nums = [32, 55, 87, 13, 78, 96, 52, 48, 22, 11, 58, 66, 88, 45]
        nums.forEach((el) => list.insertLast(el))
        const index = list.partition()
        expect(index).toEqual(6)
      })
      test('elements to the left of the partition should be less than the partition', () => {
        const nums = [32, 55, 87, 13, 78, 96, 52, 48, 22, 11, 58, 66, 88, 45]
        nums.forEach((el) => list.insertLast(el))
        const index = list.partition()
        expect(list.entries(index)).toEqual([45, 13, 32, 48, 22, 11, 52])
      })
      test('elements to the right of the partition should be greater than the partition', () => {
        const nums = [32, 55, 87, 13, 78, 96, 52, 48, 22, 11, 58, 66, 88, 45]
        nums.forEach((el) => list.insertLast(el))
        const index = list.partition()
        expect(list.entries().slice(index + 1)).toEqual([55, 78, 96, 58, 66, 88, 87])
      })
    })

    describe('#merge', () => {
      test('should merge with another list', () => {
        const  nums1 = [1,2,3]
        const  nums2 = [5,6,7]
        const list1 = new LinkedList()
        const list2 = new LinkedList()
        nums1.forEach((el) => list1.insertLast(el))
        nums2.forEach((el) => list2.insertLast(el))
        list2.merge(list1)
        expect(list2.entries()).toEqual([5,6,7,1,2,3])
      })
      test('should properly assign the "last" element pointer of the current list', () => {
        const  nums1 = [1,2,3]
        const  nums2 = [5,6,7]
        const list1 = new LinkedList()
        const list2 = new LinkedList()
        nums1.forEach((el) => list1.insertLast(el))
        nums2.forEach((el) => list2.insertLast(el))
        list2.merge(list1)
        expect(list2.back).toEqual(3)
      })
      test('should leave the merged list intact', () => {
        const  nums1 = [1,2,3]
        const  nums2 = [5,6,7]
        const list1 = new LinkedList()
        const list2 = new LinkedList()
        nums1.forEach((el) => list1.insertLast(el))
        nums2.forEach((el) => list2.insertLast(el))
        list2.merge(list1)
        expect(list1.entries()).toEqual([1,2,3])
      })
    })

    describe('#mergeSort', () => {
      test('#mergeSort({ 34->67->23->12->78->56->36->79->5->32->66 }) = { 5->12->23->32->34->36->56->66->67->78->79 }', () => {
          const nums = [34, 67, 23, 12, 78, 56, 36, 79, 5, 32, 66]
          nums.forEach((el) => list.insertLast(el))
          list.mergeSort()
          expect(list.entries()).toEqual([5, 12, 23, 32, 34, 36, 56, 66, 67, 78, 79])
      })
      test('#mergeSort({ 13->7->15->8->12->30->3->20 }) = { 3->7->8->12->13->15->20->30 }', () => {
          const nums = [13, 7, 15, 8, 12, 30, 3, 20]
          nums.forEach((el) => list.insertLast(el))
          list.mergeSort()
          expect(list.entries()).toEqual([3, 7, 8, 12, 13, 15, 20, 30])
      })
      test('#mergeSort({ 10->18->25->30->23->17->45->35 }) = { 10->17->18->23->25->30->35->45 }', () => {
          const nums = [10, 18, 25, 30, 23, 17, 45, 35]
          nums.forEach((el) => list.insertLast(el))
          list.mergeSort()
          expect(list.entries()).toEqual([10, 17, 18, 23, 25, 30, 35, 45])
      })
    })
})
