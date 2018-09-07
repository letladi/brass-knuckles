const LinkedList = require('./LinkedList')

class Node {
    constructor(info = null, back = null, next = null) {
        this.info = info
        this.back = back
        this.next = next
    }

    set info(info) {
        this._info = info
    }

    get info() {
        return this._info
    }

    set back(back) {
        this._back = back
    }

    get back() {
        return this._back
    }

    set next(next) {
        this._next = next
    }

    get next() {
        return this._next
    }
}

class DoublyLinkedList extends LinkedList {
    constructor() {
        super()
        this._reset()
    }

    _reset() {
        super._reset()
        this._last = null
    }

    destroy() {
        this._reset()
    }

    [Symbol.iterator]() {
        let current = this._first

        return {
            next() {
                if (current) {
                    const value = current.info
                    current = current.next
                    return {
                        value,
                        done: false,
                    }
                } else {
                    return {
                        done: true,
                    }
                }
            }
        }
    }

    search(item) {
        let found = false
        let current = this._first

        while (current !== null && found === false)
            if (current.info >= item) found = true
            else current = current.next

        if (found) found = (current.info === item)

        return found
    }

    insertLast(item) {
        this.insert(item)
    }

    insertFirst(item) {
        this.insert(item)
    }

    insert(item) {
        let current = null
        let prev = null
        let found = false

        let newNode = new Node(item)

        if (this._first === null) {
            this._first = newNode
            this._last = newNode
            this._count++
        } else {
            current = this._first

            while (current !== null && found === false)
                if (current.info >= item) found = true
                else {
                    prev = current
                    current = current.next
                }

            if (current === this._first) {
                this._first.back = newNode
                newNode.next = this._first
                this._first = newNode
                this._count++
            } else {
                if (current !== null) {
                    prev.next = newNode
                    newNode.back = prev
                    newNode.next = current
                    current.back = newNode
                } else {
                    prev.next = newNode
                    newNode.back = prev
                    this._last = newNode
                }
                this._count++
            }
        }
    }

    delete(item) {
        let current = null
        let prev = null
        let found = false
        let deleted = false

        if (this._first === null) deleted = false
        else if (this._first.info === item) {
            current = this._first
            this._first = this._first.next

            if (this._first !== null) this._first.back = null
            else this._last = null

            this._count--
            deleted = true
        } else {
            current = this._first

            while (current !== null && found === false)
                if (current.info >= item) found = true
                else current = current.next

            if (current === null) deleted = false
            else if (current.info === item) {
                prev = current.back
                prev.next = current.next

                if (current.next !== null) current.next.back = prev

                if (current === this._last) this._last = prev

                this._count--
                deleted = true
            } else deleted = false
        }
        return deleted
    }
}

module.exports = { Node, DoublyLinkedList }
