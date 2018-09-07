const Node = require('./Node');

const isEven = (n) => n % 2 === 0

class LinkedList {
    constructor() {
        this._reset()
    }

    _reset() {
        this._first = null
        this._last = null
        this._count = 0
    }

    isEmpty() {
        return this._first === null;
    }

    get length() {
        return this._count;
    }

    get front() {
        return (this.isEmpty()) ? null : this._first.info
    }

    get back() {
        return (this.isEmpty()) ? null : this._last.info
    }

    each(cb) {
        let count = 0
        for (const el of this) cb(el, count++)
    }

    rEach(cb, node = this._first, index = 0) {
        if (node !== null) {
            this.rEach(cb, node.link, index + 1)
            cb(node.info, index)
        }
    }

    destroy() {
        this._reset()
    }

    iterator() {
        return this[Symbol.iterator]()
    }

    entries(lastIndex) {
      if (this._indexIsOutOfBounds(lastIndex)) throw new Error('Index is out bounds')
        const entries = []
        let i = 0
        for (const el of this) {
          entries.push(el)
          if ((lastIndex !== void(0)) && (i === lastIndex)) break
          i++
        }
        return entries
    }

    [Symbol.iterator]() {
        let current = this._first

        return {
            next() {
                if (current) {
                    const value = current.info
                    current = current.link
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

    insertFirst(item) {
        let node = new Node(item)
        node.link = this._first
        this._first = node
        this._count++

        if (this._last === null) this._last = node
    }

    insertLast(item) {
        let node = new Node(item)

        if (this._first === null) {
            this._first = node
            this._last = node
        } else {
            this._last.link = node
            this._last = node
        }
        this._count++
    }

    delete(item) {
        let current = null
        let prev = null
        let found = false
        let deleted = false

        if (this._first === null) deleted = false
        else {
            if (this._first.info === item) {
                current = this._first
                this._first = this._first.link
                this._count--

                if (this._first === null) this._last = null
                deleted = true
            } else {
                prev = this._first
                current = this._first.link

                while (current !== null && found === false) {
                    if (current.info !== item) {
                        prev = current
                        current = current.link
                    } else found = true
                }

                if (found) {
                    prev.link = current.link
                    this._count--

                    if (this._last === current) this._last = prev
                    deleted = true
                }
            }
        }

        return deleted
    }

    deleteMin(from = 0) {
       let deleted = false
       let min = null
       let minPrev = null

        if (this.isEmpty() || this._indexIsOutOfBounds(from)) deleted = false
        else if (this.length === 1) {
            min = this._first
            this._reset()
            deleted = true
        }
        else {
            let prev = this._first
            let current = this._first.link

            minPrev = null
            min = prev

            let i = 0
            while (i < from) {
              minPrev = min
              min = prev = current
              current = current.link
              i++
            }

            while (current != null) {
                if (current.info < min.info) {
                    min = current
                    minPrev = prev
                }
                prev = current
                current = current.link
            }

            if (this._first === min) this._first = min.link
            else if (this._last === min) {
                this._last = minPrev
                this._last.link = null
            } else {
                minPrev.link = min.link
            }
            this._count--
            deleted = true
        }
        return deleted ? min.info : false
    }

    deleteAll(item) {
        let deleted = false
        if (this.isEmpty()) deleted = false
        else {
            let found = false
            let prev = null
            let current = this._first

            while (current !== null) {
                if (current.info === item) {
                    if (current === this._first) {
                        this._first = current.link
                    } else if (current === this._last) {
                        this._last = prev
                        this._last.link = null
                    } else {
                        prev.link = current.link
                    }
                    deleted = true
                    this._count--
                }
                prev = current
                current = current.link
            }
        }
        return deleted
    }

    deleteAt(i) {
        let deleted = false
        if (this._indexIsOutOfBounds(i)) deleted = false
        else {
            let prev = null
            let current = this._first

            let tracker = 0
            while (tracker < i) {
                prev = current
                current = current.link
                tracker++
            }
            if (current === this._first) {
                this._first = current.link
            }
            else if (current === this._last) {
                this._last = prev
                this._last.link = null
            } else {
                prev.link = current.link
            }
            this._count--
            deleted = true
        }
        return deleted
    }

    at(i) {
        if (this._indexIsOutOfBounds(i)) return null
         else {
             let tracker = 0
             let current = this._first

             while (tracker < i) {
                current = current.link
                 tracker++
             }
             return current.info
         }
    }

    search(item) {
        let found = false
        let current = this._first

        while (current !== null && found === false)
            if (current.info === item) found = true
            else current = current.link

        return found
    }

    divideMid() {
        const list = new LinkedList()

        if (this.length === 1 || this.isEmpty()) return list

        const len = this.length
        const dividedLen = len / 2
        let numElementsInCurrentList = isEven(len) ? dividedLen : Math.floor(dividedLen) + 1
        this._count = numElementsInCurrentList
        let indexOfFirstElementInSecondList = numElementsInCurrentList
        let count = 0
        let current = this._first
        let prev = null
        while (count < numElementsInCurrentList) {
            prev = current
            current = current.link
            count++
        }

        this._last = prev
        this._last.link = null

        while (current !== null) {
            list.insertLast(current.info)
            current = current.link
        }
        return list
    }

    divideAt(val) {
        const list = new LinkedList()

        if (this.isEmpty()) return list

        let found = false
        let index = 0
        let prev = null
        let current = this._first

        while (current && found === false) {
            if (current.info === val) found = true
            else {
                prev = current
                current = current.link
                index++
            }
        }

        if (found === false) return list
        else {
            this._count = index
            this._last = prev

            if (index === 0) this._first = this._last = null
            else this._last.link = null

            while (current) {
                list.insertLast(current.info)
                current = current.link
            }
            return list
        }
    }

    deleteMax(from = 0) {
       let deleted = false
       let max = null
       let maxPrev = null

        if (this.isEmpty() || this._indexIsOutOfBounds(from)) deleted = false
        else if (this.length === 1) {
            max = this._first
            this._reset()
            deleted = true
        }
        else {
            let prev = this._first
            let current = this._first.link

            maxPrev = null
            max = prev

            let i = 0
            while (i < from) {
              maxPrev = max
              max = prev = current
              current = current.link
              i++
            }

            while (current != null) {
                if (current.info > max.info) {
                    max = current
                    maxPrev = prev
                }
                prev = current
                current = current.link
            }

            if (this._first === max) this._first = max.link
            else if (this._last === max) {
                this._last = maxPrev
                this._last.link = null
            } else {
                maxPrev.link = max.link
            }
            this._count--
            deleted = true
        }
        return deleted ? max.info : false
    }

    sort(compare = (a, b) => a > b ? 1 : -1) {
      const entries = this.entries()
      entries.sort(compare)
      this.destroy()
      entries.forEach((el) => this.insertLast(el))
    }

    _indexIsOutOfBounds(i) {
      return (i < 0 || i >= this.length)
    }

    swap(i, j) {
      if (this._indexIsOutOfBounds(i) || this._indexIsOutOfBounds(j)) throw new Error('index is out of bounds')

      let first_current = this._first
      let second_current = this._first
      let index = 0

      while ((index < i || index < j) && (first_current && second_current)) {
        if (index < i) {
          first_current = first_current.link
        }
        if (index < j) {
          second_current = second_current.link
        }
        index++
      }

      const tempInfo = first_current.info
      first_current.info = second_current.info
      second_current.info = tempInfo
    }

    merge(otherList) {
      for (const el of otherList) {
        this.insertLast(el)
      }
    }

    partition(start = 0, end = this.length - 1) {
      const pivotIdx = Math.floor((start + end) / 2)
      this.swap(start, pivotIdx)

      let current = this._first

      let i = 0
      while (i < start) {
        current = current.link
        i++
      }

      let pivot = current
      let smallIndex = i

      for (let j = i + 1, jCurrent = current.link; j <= end; j++) {
        if (jCurrent.info < pivot.info) {
          current = current.link
          smallIndex++
          const tempInfo = jCurrent.info
          jCurrent.info = current.info
          current.info = tempInfo
        }
        jCurrent = jCurrent.link
      }

      this.swap(smallIndex, start)

      return smallIndex
    }

    mergeSort() {
      if (this.length === 1) return this
      const sublist = this.divideMid()
      const resultingSublist1 = sublist.mergeSort()
      const resultingSublist2 = this.mergeSort()

      let walker1 = resultingSublist1[Symbol.iterator]()
      let walker2 = resultingSublist2[Symbol.iterator]()

      let walker1Val = walker1.next()
      let walker2Val = walker2.next()

      this.destroy()

      while (walker1Val.done === false || walker2Val.done === false) {
        if (walker1Val.done) {
          this.insertLast(walker2Val.value)
          walker2Val = walker2.next()
        } else if (walker2Val.done) {
          this.insertLast(walker1Val.value)
          walker1Val = walker1.next()
        } else if (walker1Val.value < walker2Val.value) {
          this.insertLast(walker1Val.value)
          walker1Val = walker1.next()
        } else {
          this.insertLast(walker2Val.value)
          walker2Val = walker2.next()
        }
      }
      return this
    }
}

module.exports = LinkedList
