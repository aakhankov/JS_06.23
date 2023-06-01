//Task1_getDistance

function getDistance(x1, y1, x2, y2) {
  const isValidCoordinate = (num) =>
    typeof num === "number" &&
    !isNaN(num) &&
    num !== Infinity &&
    num >= -1000 &&
    num <= 1000
  
  if (
    !isValidCoordinate(x1) ||
    !isValidCoordinate(y1) ||
    !isValidCoordinate(x2) ||
    !isValidCoordinate(y2)
  ) {
    throw new Error();
  }

  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return parseFloat(distance.toFixed(2))
}

//Task2_switchPlaces

function switchPlaces(arr) {
  const length = arr.length

  if (length === 0) {
    return []
  }

  if (!Array.isArray(arr)) {
    throw new Error();
  }

  const middle = Math.floor(length / 2);
  const firstHalf = arr.slice(0, middle);
  const secondHalf = arr.slice(middle);

  return secondHalf.concat(firstHalf)
}

//Task3_getDivisors

function getDivisors(number) {
  const divisors = []

  if (
    typeof number !== "number" ||
    number === Infinity ||
    number === -Infinity ||
    isNaN(number)
  ) {
    throw new Error();
  }

  for (let i = number; i >= 1; i--) {
    if (number % i === 0) {
      divisors.push(i)
    }
  }
  return divisors
}