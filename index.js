//Homework4
//Task1
function createDebounceFunction(callback, delay) {
  if (
    typeof callback !== "function" ||
    typeof delay !== "number" ||
    !Number.isFinite(delay) ||
    delay <= 0
  ) {
    throw new Error("Invalid argument")
  }

  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      callback.apply(null, args)
    }, delay)
  }
}

//Task2
class RickAndMorty {
  getCharacter(id) {
    if (
      typeof id !== "number" ||
      isNaN(id) ||
      !Number.isInteger(id) ||
      id < 0
    ) {
      throw new Error("Invalid character id")
    }

    return fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error)
        } else {
          return data
        }
      })
      .catch((error) => {
        return null
      })
  }

  async getEpisode(id) {
    if (
      typeof id !== "number" ||
      isNaN(id) ||
      !Number.isInteger(id) ||
      id < 0
    ) {
      throw new Error("Invalid episode id")
    }

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      )
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      } else {
        return data
      }
    } catch (error) {
      return null
    }
  }
}
