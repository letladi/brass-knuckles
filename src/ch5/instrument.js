const List = require('./LinkedList')

list = new List

const nums = [1, 2]
nums.forEach((el) => list.insertLast(el))
const list2 = list.divideMid()

console.log(list2)
console.log(list)
