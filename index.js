//HOMEWORK3
//Task1
Array.prototype.customFilter = customFilter
function customFilter(callback, thisArg) {
  if (typeof callback !== "function") {
    throw new Error("Invalid argument.")
  }

  if (
    thisArg !== undefined &&
    (typeof thisArg !== "object" || thisArg === null)
  ) {
    throw new Error("Invalid argument.")
  }

  const filteredArray = []
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      filteredArray.push(this[i])
    }
  }

  return filteredArray
}

//Task2
function bubbleSort(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("Invalid argument.")
  }
  function isValidNumber(value) {
    return typeof value === "number" && isFinite(value)
  }
  const sortedArray = arr.slice()

  for (let i = 0; i < sortedArray.length - 1; i++) {
    for (let j = 0; j < sortedArray.length - i - 1; j++) {
      const current = sortedArray[j]
      const next = sortedArray[j + 1]

      if (!isValidNumber(current) || !isValidNumber(next)) {
        throw new Error("Invalid argument.")
      }

      if (current > next) {
        sortedArray[j] = next
        sortedArray[j + 1] = current
      }
    }
  }

  return sortedArray
}

//Task3
function storageWrapper(callback, arr = []) {
  if (typeof callback !== 'function') {
    throw new Error('Invalid argument.');
  }

  if (arr && !Array.isArray(arr)) {
    throw new Error('Invalid argument.');
  }

  return function (...args) {
    const result = callback(...args);

    if (arr) {
      arr.push(result);
      return result;
    } else {
      return arr;
    }
  };
}