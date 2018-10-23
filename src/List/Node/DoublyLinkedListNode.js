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

module.exports = Node
