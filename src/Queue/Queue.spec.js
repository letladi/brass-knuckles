const Queue = require('./Queue')

const populate = (queue) => [1, 2].forEach((el) => queue.enqueue(el))

describe('Queue', () => {
  let queue = null
  beforeEach(() => queue = new Queue())
  describe('#enqueue', () => {
    it('should add elements to the end of the list', () => {
      queue.enqueue(1)
      expect(queue.back).toEqual(1)
      queue.enqueue(2)
      expect(queue.back).toEqual(2)
    })
    it('increases the size of the queue', () => {
      expect(queue.size).toEqual(0)
      queue.enqueue(1)
      expect(queue.size).toEqual(1)
    })
  })
  describe('#dequeue', () => {
    it('should decrease the size of the queue', () => {
      populate(queue)
      expect(queue.size).toEqual(2)
      queue.dequeue()
      expect(queue.size).toEqual(1)
      queue.dequeue()
      expect(queue.size).toEqual(0)
    })
    it('should return element from the front', () => {
      populate(queue)
      const frontEl = queue.front
      expect(queue.dequeue()).toEqual(frontEl)
    })
    it('should remove element at the front', () => {
      populate(queue)
      const frontEl = queue.front
      queue.dequeue()
      expect(queue.front).not.toEqual(frontEl)
    })
    it('throws an exception if empty', () => {
      expect(() => queue.dequeue()).toThrow(new Error(Queue.prototype.messages.dequeueEmptyQueueError))
    })

  })
  describe('#isEmpty', () => {
    it('should be true if empty', () => {
      expect(queue.isEmpty()).toEqual(true)
    })
    it('should be false if not empty', () => {
      queue.enqueue(1)
      expect(queue.isEmpty()).toEqual(false)
    })
  })
  describe('.front', () => {
    it('returns element at the front', () => {
      populate(queue)
      expect(queue.front).toEqual(1)
    })
    it('returns null if empty', () => {
      expect(queue.front).toEqual(null)
    })
  })
  describe('.back', () => {
    it('returns element at the back of the list', () => {
      populate(queue)
      expect(queue.back).toEqual(2)
    })
    it('returns null if empty', () => {
      expect(queue.back).toEqual(null)
    })
  })
  describe('.size', () => {
    it('returns the size of the queue', () => {
      expect(queue.size).toEqual(0)
      queue.enqueue(1)
      expect(queue.size).toEqual(1)
    })
  })
})
