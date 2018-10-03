const assert = require('assert')

exports.isOverflowing = (node, maxDegree) => {
  assert(maxDegree, 'maximum degree value to compare with is required')
  return node.degree > maxDegree
}

exports.isUnderflowing = (node, minDegree) => {
  assert(minDegree, 'minimum degree value to compare with is required')
  return node.degree < minDegree
}
