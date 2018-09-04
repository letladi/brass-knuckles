const { last, first } = require('../util/') 

class Queue {
  constructor() {
    this._elements = []
  }

  enqueue(val) {
    this._elements.push(val)
  }

  dequeue() {
    if (this.isEmpty()) throw new Error(this.messages.dequeueEmptyQueueError)
    return this._elements.shift()
  }

  isEmpty() {
    return this.size === 0
  }

  get size() {
    return this._elements.length
  }

  get front() {
    return this.isEmpty() ? null : first(this._elements)
  }

  get back() {
    return this.isEmpty() ? null : last(this._elements)
  }
}

Queue.prototype.messages = {
  dequeueEmptyQueueError: 'You cannot dequeue an empty queue'
}

module.exports = Queue
