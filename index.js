//HOMEWORK2
//Task1

function makeDeepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    throw new Error()
  }

  let copy

  if (Array.isArray(obj)) {
    copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = makeDeepCopy(obj[i])
    }
  } else if (obj instanceof Map) {
    copy = new Map()
    obj.forEach((value, key) => {
      copy.set(makeDeepCopy(key), makeDeepCopy(value))
    })
  } else if (obj instanceof Set) {
    copy = new Set()
    obj.forEach((value) => {
      copy.add(makeDeepCopy(value))
    })
  } else {
    copy = {}
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        copy[key] = makeDeepCopy(obj[key])
      }
    }
  }
  return copy
}

//Task2
function createIterable(from, to) {
  if (
    typeof from !== "number" ||
    typeof to !== "number" ||
    !isFinite(from) ||
    !isFinite(to) ||
    from >= to
  ) {
    throw new Error()
  }

  return {
    [Symbol.iterator]() {
      let current = from

      return {
        next() {
          if (current <= to) {
            return { value: current++, done: false }
          } else {
            return { done: true }
          }
        },
      }
    },
  }
}

// Task 3
function createProxy(obj) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    throw new Error()
  }

  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        target[prop].readAmount = (target[prop].readAmount || 0) + 1
      }
      return target[prop]
    },
    set(target, prop, value) {
      if (!(prop in target)) {
        target[prop] = {
          value: value,
          readAmount: 0,
        }
      } else {
        const existingValue = target[prop].value
        if (typeof existingValue === typeof value || existingValue === null) {
          target[prop].value = value
        } else {
          throw new Error()
        }
      }
      return true
    },
  })
}
