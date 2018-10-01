const Tree = require('./src/Tree/abTree')

const tree = new Tree(4, 8)
let i = 1
while (i < 16) {
  tree.insert(i, `number ${i++}`)
}
console.log(tree.root)
console.log(tree.root.next[0])
console.log(tree.root.next[1])
