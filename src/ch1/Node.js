class Node {
    constructor(info = null, link = null) {
        this._info = info
        this._link = link
    }

    get info() {
        return this._info
    }

    set info(info) {
        this._info = info
    }

    get link() {
        return this._link
    }

    set link(link) {
        this._link = link
    }
}

module.exports = Node
