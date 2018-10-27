const Node = require('./src/Tree/LeafTreeNode')
const LeafTree = require('./src/Tree/LeafTree')
const { leaveCount, nodeCount } = require('./src/Tree/treeUtils')

function totalDepth(node, depth = 0) {
  if (!Node.isNode(node)) {
    return 0
  }
  return depth + totalDepth(node.left, depth + 1) + totalDepth(node.right, depth + 1)
}

function averageDepth(tree) {
  const total = totalDepth(tree.root)
  return total / leaveCount(tree)
}

const tree = new LeafTree()
let i = 20
while (i) {
  tree.insert(i, `number-${i--}`)
}

console.log('totalDepth', totalDepth(tree.root), leaveCount(tree), nodeCount(tree))
console.log('averageDepth', averageDepth(tree))
