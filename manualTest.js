const Tree = require('./src/Tree/rbTree/rbTree')

const  tree = new Tree()

// tree.insert(1, 'one')
// tree.insert(2, 'two')
// tree.insert(3, 'three')
// tree.insert(4, 'four')
let i = 20
while (i) tree.insert(i, `number-${i--}`)
console.log(tree.height)
