const Node = require('./LevelLinkedTreeNode')
const LeafTree = require('../LeafTree/LeafTree')
const Stack = require('../Stack/Stack')
const { isNull } = require('../util/')

const isRoot = node => isNull(node.parent)
const key = node => node.key

function navigateTree(node, key) {
  const stack = new Stack()
  while (!node.isLeaf()) {
    stack.push(node)
    node = (key < node.key) ? node.left : node.right
  }
  stack.push(node)
  return stack
}

class LevelLinkedTree extends LeafTree {
  createNode(key, left, right) {
    return new Node(key, left, right)
  }

  insert(key, val) {
    if (this.isEmpty()) this.root = this.createNode(key, val)
    else {
      const stack = new Stack()
      let node = this.root
      while (!node.isLeaf()) {
        stack.push(node)
        node = (key < node.key) ? node.left : node.right
      }
      stack.push(node)

      if (node.key === key) return false
      else {
        let oldLeaf = this.createNode(node.key, node.value)
        const newLeaf = this.createNode(key, val)

        if (node.key < key) {
          node.left = oldLeaf
          node.right = newLeaf

          oldLeaf.linkRight(newLeaf)
          oldLeaf.linkLeft(getLeftMostLeaveNodeOfParentSibling(oldLeaf))
          newLeaf.linkRight(getRightMostLeaveNodeOfParentSibling(newLeaf))
          oldLeaf.linkParent(node)
          newLeaf.linkParent(node)
          node.key = key
        } else {
          node.left = newLeaf
          node.right = oldLeaf

          oldLeaf.linkLeft(newLeaf)
          oldLeaf.linkRight(getRightMostLeaveNodeOfParentSibling(oldLeaf))
          newLeaf.linkLeft(getLeftMostLeaveNodeOfParentSibling(newLeaf))
          newLeaf.linkParent(node)
          oldLeaf.linkParent(node)
        }
      }
      this.balance(stack)
    }
    return true
  }

  set(key, val) {
    if (this.isEmpty()) this.root = this.createNode(key, val)
    else {
      const nodesOnNavigationPath = navigateTree(this.root, key)
      const node = nodesOnNavigationPath.top()

      if (node.key === key) {
        node.left = val
        return
      }
      else {
        let oldLeaf = this.createNode(node.key, node.value)
        const newLeaf = this.createNode(key, val)

        // case 1: if the new leaf is the right of its parent,
        //    we link it to its parent
        //    its left sibling becomes its levelLeft
        //    case 1.1: we look at its parent;
        //      case 1.1.1: if the parent is a left child, we look for the left-most child leaf of its right sibling
        //      case 1.1.2: we look for a levelRight of the parent (or a right sibling or levelRight of any of its ancestors)
        //                  and then we get the left-most child of that left sibling or levelRight
        //                  if there is no left sibling, we get the right leaf of the left-most interior node

        // case 2: the new leaf is the left of its parent
        //    we link it to its parent
        //    its right sibling becomes its levelRight
        //    case 2.1: we look at its parent
        //      case 2.1.1: if the parent is a right child, we look for the right-most child leaf of its left sibling
        //      case 2.1.2: we for a levelLeft of the parent (or a left sibling or levelLeft of its closest ancestor)
        //                  and then we get the right-most child leaf of that left sibling of levelLeft
        //                    if there is no right sibling, we get the left leaf of the right-most interior node
        //

        // we must now adjust the levelLinks of the parent
        // case 1: the sibling of the parent is a leaf
        //    we must remove the level links of the parent
        // 


        // if (node.key < key) {
        //   node.left = oldLeaf
        //   node.right = newLeaf
        //   oldLeaf.linkRight(newLeaf)
        //   oldLeaf.linkParent(node)
        //   newLeaf.linkLeft(oldLeaf)
        //   newLeaf.linkParent(node)
        //   node.key = key
        // } else {
        //   node.left = newLeaf
        //   newLeaf.linkRight(oldLeaf)
        //   newLeaf.linkParent(node)
        //   node.right = oldLeaf
        //   oldLeaf.linkLeft(newLeaf)
        //   oldLeaf.linkParent(node)
        // }
        this.balance(nodesOnNavigationPath)
      }
    }
  }

  delete(key) {
    if (this.isEmpty()) return null
    else if (this.root.isLeaf()) {
      if (this.root.key === key) {
        const deleteVal = this.root.value
        this.root.left = null
        return deleteVal
      }
      return null
    } else {
      const nodesOnNavigationPath = navigateTree(this.root, key)
      const node = nodesOnNavigationPath.pop()

      if (node.key !== key) return null
      else {
        const parent = nodesOnNavigationPath.pop()
        let sibling = null
        if (parent.left === node) {
          sibling = parent.right
        } else {
          sibling = parent.left
        }
        sibling.linkParent(sibling.parent.parent)
        sibling.linkLeft(parent.levelLeft)
        sibling.linkRight(parent.levelRight)
        //const sibling = parent.left === node ? parent.right : parent.left
        Object.assign(parent, sibling)

        this.balance(nodesOnNavigationPath)
        return node.value
      }
    }
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

function getNextLeftMostLeafNode(node) {
  let result = null
  let  parent = node.parent
  if (node === parent.left) {
    const levelLeftOfParent = parent.levelLeft
    if (isNull(levelLeftOfParent)) {
      parent = parent.parent
      if (isNull(parent)) return result
    }
  }
}

module.exports = LevelLinkedTree
