const last = list => list[list.length - 1]

const length = list => list.length

const first = list => list[0]

const isNull = val => val === null

const isEven = x => x % 2 === 0

const isZero = x => x === 0

module.exports = {
  first,
  last,
  length,
  isNull,
  isEven,
  isZero,
}
