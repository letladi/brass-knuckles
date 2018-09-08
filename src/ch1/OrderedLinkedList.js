const Node = require('./Node/LinkedListNode')
const LinkedList = require('./LinkedList')
const { isNull } = require('../util/')

class OrderedLinkedList extends LinkedList {
  constructor() {
    super()
  }

  search(item) {
    let found = false
    let current = this._first

    while (current && found === false)
      if (current.info >= item) found = true
      else current = current.link

    if (found) found = (current.info === item)

    return found
  }

  insert(item) {
    if (this.search(item)) return false

    let current = new Node()
    let prev = new Node()
    let newNode = new Node(item)
    let found = false

    if (isNull(this._first)) {
      this._first = newNode
      this._last = newNode
      this._count++
    } else {
      current = this._first
      while (current && found === false)
        if (current.info >= item) found = true
        else {
          prev = current
          current = current.link
        }

      if (current === this._first) {
        newNode.link = this._first
        this._first = newNode
        this._count++
      } else {
        prev.link = newNode
        newNode.link = current
        if (isNull(current)) this._last = newNode
        this._count++
      }
    }

    return true
  }

  insertFirst(item) {
    this.insert(item)
  }

  insertLast(item) {
    this.insert(item)
  }

  delete(item) {
    let current = null
    let prev = null
    let found = false
    let deleted = false

    if (isNull(this._first)) deleted = false
    else {
      current = this._first

      while (current && found === false)
        if (current.info >= item) found = true
        else {
          prev = current
          current = current.link
        }

      if (isNull(current)) deleted = false
      else if (current.info === item) {
        if (this._first === current) {
          this._first = this._first.link
          if (isNull(this._first)) this._last = null
        } else {
          prev.link = current.link
          if (current === this._last) this._last = prev
        }
        this._count--
        deleted = true
      } else {
        deleted = false
      }
    }
    return deleted
  }

  merge(other) {
    const list = new OrderedLinkedList()
    if (this.isEmpty()) {
      other.each((el) => list.insert(el))
    } else if (other.isEmpty()) {
      this.each((el) => list.insert(el))
    } else {
      let current1 = this._first
      let current2 = other._first

      while (current1 && current2) {
        if (current1.info < current2.info) {
          list.insert(current1.info)
          current1 = current1.link
        } else if (current1.info > current2.info) {
          list.insert(current2.info)
          current2 = current2.link
        } else if (current1.info === current2.info) {
          list.insert(current1.info)
          list.insert(current2.info)
        }
      }

      while (current1) {
        list.insert(current1.info)
        current1 = current1.link
      }
      while (current2) {
        list.insert(current2.info)
        current2 = current2.link
      }
    }
    return list
  }
}

module.exports = OrderedLinkedList
