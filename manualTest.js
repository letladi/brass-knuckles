const LeafTree = require('./src/SearchTree/LeafTree')

const tree = new LeafTree()

tree.insert(1, 'one')
console.log('here is the tree', tree)
tree.insert(2, 'two')
console.log('here is the tree', tree)
tree.insert(3, 'three')
tree.insert(4, 'four')
console.log('here is the tree', tree)
tree.insert(5, 'five')
tree.insert(6, 'six')
tree.insert(7, 'seven')

console.log('tree.intervalFind', JSON.stringify(tree.intervalFind(1, 5)))
