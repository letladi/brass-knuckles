const binarySearch = (list, key) => {
  let low = 0
  let hi = list.length - 1

  while (low <= hi) {
    let mid = Math.floor((low + hi) / 2)
    let midVal = list[mid]

    if (midVal < key) low = mid + 1
    else if (midVal > key) hi = mid - 1
    else return mid
  }
  return low
}

module.exports = binarySearch
