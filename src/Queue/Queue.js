const LinkedList = require('../List/LinkedList')

class Queue {
  constructor() {
    this._elements = new LinkedList()
  }

  enqueue(val) {
    this._elements.insertLast(val)
  }

  dequeue() {
    if (this.isEmpty()) throw new Error(this.messages.dequeueEmptyQueueError)
    const ret = this.front
    this._elements.deleteAt()
    return ret
  }

  isEmpty() {
    return this._elements.isEmpty()
  }

  get size() {
    return this._elements.length
  }

  get front() {
    return this._elements.front
  }

  get back() {
    return this._elements.back
  }
}

Queue.prototype.messages = {
  dequeueEmptyQueueError: 'You cannot dequeue an empty queue'
}

module.exports = Queue
