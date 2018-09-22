const LeafTree = require('./src/Tree/HeightBalancedLeafTree')

const tree = new LeafTree()

tree.insert(1, 'one')
tree.insert(2, 'two')
tree.insert(3, 'three')
tree.insert(4, 'four')
tree.insert(5, 'five')
tree.insert(6, 'six')
tree.insert(7, 'seven')

console.log(tree.delete(4))
