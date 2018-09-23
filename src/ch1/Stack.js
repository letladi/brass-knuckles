const LinkedList = require('./LinkedList')

class Stack {
  constructor() {
    this._elements = new LinkedList()
  }

  get size() {
    return this._elements.length
  }

  isEmpty() {
    return this._elements.isEmpty()
  }

  top() {
    return this._elements.front
  }

  pop() {
    if (this.isEmpty()) throw new Error(Stack.prototype.messages.emptyStackError)
    const ret = this._elements.front
    this._elements.deleteAt(0)
    return ret
  }

  push(val) {
    this._elements.insertFirst(val)
  }

  clear() {
    this._elements.clear()
  }
}

Stack.prototype.messages = {
  emptyStackError: 'Cannot pop an empty stack'
}

module.exports = Stack
