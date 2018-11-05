const Stack = require('./Stack')

describe('Stack', () => {
  let stack = null
  beforeEach(() => stack = new Stack())

  describe('#isEmpty', () => {
    it('returns true when the stack is empty', () => {
      expect(stack.isEmpty()).toEqual(true)
    })
    it('returns false when the stack has some elements', () => {
      stack.push(1)
      expect(stack.isEmpty()).toEqual(false)
    })
  })

  describe('#push', () => {
    const elementsAndSizesAfterTheyAreAdded = [
      ['one', 1],
      ['two', 2],
      ['three', 3]
    ]
    it('should add elements to the stack', () => {
      elementsAndSizesAfterTheyAreAdded.forEach(([el, sizeAfterAddition]) => {
        stack.push(el)
        expect(stack.size).toEqual(sizeAfterAddition)
      })
    })
  })

  describe('#pop', () => {
    it('should remove and return elements from the stack', () => {
      [1,2].forEach((el) => stack.push(el))

      const ret1 = stack.pop()
      expect(stack.size).toEqual(1)
      expect(ret1).toEqual(2)
    })
    it('should throw an error if an empty stack is popped', () => {
      expect(() => stack.pop()).toThrow(new Error(Stack.prototype.messages.emptyStackError))
    })
  })

  describe('#top', () => {
    it('should return the top element and not remove it', () => {
      [1,2].forEach((el) => stack.push(el))

      const ret1 = stack.top()
      expect(stack.size).toEqual(2)
      expect(ret1).toEqual(2)
    })

    it('should return null if the stack is empty', () => {
      const ret1 = stack.top()
      expect(ret1).toEqual(null)
    })
  })

  describe('#clear', () => {
    it('resets back to the initial state', () => {
      [1, 2, 3].forEach((el) => stack.push(el))
      stack.clear()
      expect(stack.isEmpty()).toEqual(true)
      expect(stack.size).toEqual(0)
    })
  })
})
