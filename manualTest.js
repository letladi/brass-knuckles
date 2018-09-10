const LeafTree = require('./src/SearchTree/LeafTree')

const tree = new LeafTree()

tree.insert(1, 'one')
tree.insert(2, 'two')
tree.insert(3, 'three')
tree.insert(4, 'four')
tree.insert(5, 'five')
tree.insert(6, 'six')
tree.insert(7, 'seven')

console.log('tree.intervalFind', tree.intervalFind(1, 5))
