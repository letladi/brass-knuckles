const Tree = require('./src/Tree/abTree/abTree')

const tree = new Tree(4)
let i = 200000
while (i) {
  tree.insert(i, `number ${i--}`)
}
 // tree.insert(0, 'zero')
 // tree.insert(-1, 'minus 1')
 // tree.insert(-2, 'minus 2')
// tree.insert(2, 'two')
// tree.insert(3, 'three')

// console.log(tree.find(50000))
// console.log(tree.root.next)

console.log(tree.find(100000))
