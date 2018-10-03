const Tree = require('./src/Tree/abTree')

const tree = new Tree(4, 8)
let i = 1
while (i < 10) {
  tree.insert(i, `number ${i++}`)
}
tree.insert(1, 'one')
console.log(tree.root)
console.log(tree.root.next[0])
