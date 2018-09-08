const last = list => list[list.length - 1]

const first = list => list[0]

const isNull = val => val === null

const isEven = (n) => n % 2 === 0

module.exports = {
  first,
  last,
  isNull,
  isEven,
}
