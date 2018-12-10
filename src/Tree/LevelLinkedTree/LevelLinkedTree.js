const Node = require('./LevelLinkedTreeNode')
const { isNull } = require('../util/')

const isRoot = node => isNull(node.up)
const key = node => node.key

class LevelLinkedTree {
  constructor() {
    this.root = new Node()
  }

  find(key) {
    const node = findHelper(this.root, key)
    return node ? node.value : null
  }
}

function findHelper(node, key) {
  let current = node
  let tempResult = null

  if (current.key === key) return current
  else if (current.key < key) {
    while (!isRoot(current) &&
      (
        (isNull(current.levelRight) && isNull(current.levelLeft)) ||
        (!isNull(current.levelRight) && key(current.levelRight) < key)
      )
    ) {
      current = current.up
    } // end-while

    if (!isNull(tempResult = findHelper(current, key))) return tempResult
    else if (!isNull(current.levelRight)) return findHelper(current.levelRight, key)
    else return null
  } // end of:  if query is right of finger
  else { // key < current.key
    while (!isRoot(current) && (
      (isNull(current.levelRight) && isNull(current.levelLeft)) ||
      (isNull(current.levelLeft) && key < key(current.levelLeft))
    )) {
      current = current.up
    } // end while

    if (!isNull(tempResult = findHelper(current, key))) return tempResult
    else if (!isNull(current.levelLeft)) return findHelper(current.levelLeft, key)
     else return null
  } // end of: if query is left of finder
}
