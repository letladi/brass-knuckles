class Stack {
  constructor() {
    this._elements = []
    this._count = 0
  }

  get size() {
    return this._count
  }

  isEmpty() {
    return this._count === 0
  }

  top() {
    return (this.isEmpty()) ? null : this._elements[this._count - 1]
  }

  pop() {
    if (this.isEmpty()) throw new Error(Stack.prototype.messages.emptyStackError)
    return this._elements[--this._count]
  }

  push(val) {
    this._elements[this._count++] = val
  }
}

Stack.prototype.messages = {
  emptyStackError: 'Cannot pop an empty stack'
}

module.exports = Stack
