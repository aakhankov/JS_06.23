//Homework5

//Task1 Stack
class Stack {
  constructor(limit = 10) {
    if (typeof limit !== "number" || !Number.isFinite(limit) || limit <= 0) {
      throw new Error("Invalid limit value")
    }
    this.limit = limit
    this.stack = []
  }

  push(elem) {
    if (this.stack.length >= this.limit) {
      throw new Error("Limit exceeded")
    }
    this.stack.push(elem)
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Empty stack")
    }
    return this.stack.pop()
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }
    return this.stack[this.stack.length - 1]
  }

  isEmpty() {
    return this.stack.length === 0
  }

  toArray() {
    return [...this.stack]
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Not iterable")
    }
    const stack = new Stack(iterable.length)
    for (const elem of iterable) {
      stack.push(elem)
    }
    return stack
  }
}

//Task2 LinkedList
class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  append(elem) {
    const newNode = {
      value: elem,
      next: null,
    }

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
  }

  prepend(elem) {
    const newNode = {
      value: elem,
      next: null,
    }

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
  }

  find(elem) {
    let currentNode = this.head

    while (currentNode) {
      if (currentNode.value === elem) {
        return currentNode
      }
      currentNode = currentNode.next
    }

    return null
  }

  toArray() {
    const arr = []
    let currentNode = this.head

    while (currentNode) {
      arr.push(currentNode.value)
      currentNode = currentNode.next
    }

    return arr
  }

  static fromIterable(iterable) {
    if (typeof iterable[Symbol.iterator] !== "function") {
      throw new Error("Not iterable")
    }

    const linkedList = new LinkedList()

    for (const item of iterable) {
      linkedList.append(item)
    }

    return linkedList
  }
}

//Task3 Car
class Car {
  #brand = ""
  get brand() {
    return this.#brand
  }

  set brand(value) {
    if (typeof value !== "string" || value.length < 1 || value.length > 50) {
      throw new Error("Invalid brand name")
    }
    this.#brand = value
  }

  #model = ""
  get model() {
    return this.#model
  }

  set model(value) {
    if (typeof value !== "string" || value.length < 1 || value.length > 50) {
      throw new Error("Invalid model name")
    }
    this.#model = value
  }

  #yearOfManufacturing = 1950
  get yearOfManufacturing() {
    return this.#yearOfManufacturing
  }

  set yearOfManufacturing(value) {
    const currentYear = new Date().getFullYear()
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 1950 ||
      value > currentYear
    ) {
      throw new Error("Invalid year of manufacturing")
    }
    this.#yearOfManufacturing = value
  }

  #maxSpeed = 100
  get maxSpeed() {
    return this.#maxSpeed
  }

  set maxSpeed(value) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 100 ||
      value > 330
    ) {
      throw new Error("Invalid max speed")
    }
    this.#maxSpeed = value
  }

  #maxFuelVolume = 20
  get maxFuelVolume() {
    return this.#maxFuelVolume
  }

  set maxFuelVolume(value) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 20 ||
      value > 100
    ) {
      throw new Error("Invalid max fuel volume")
    }
    this.#maxFuelVolume = value
  }

  #fuelConsumption = 1
  get fuelConsumption() {
    return this.#fuelConsumption
  }

  set fuelConsumption(value) {
    if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
      throw new Error("Invalid fuel consumption")
    }
    this.#fuelConsumption = value
  }

  #damage = 1
  get damage() {
    return this.#damage
  }

  set damage(value) {
    if (
      typeof value !== "number" ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > 5
    ) {
      throw new Error("Invalid damage")
    }
    this.#damage = value
  }

  #currentFuelVolume = 0
  get currentFuelVolume() {
    return this.#currentFuelVolume
  }

  #isStarted = false
  get isStarted() {
    return this.#isStarted
  }

  #mileage = 0
  get mileage() {
    return this.#mileage
  }

  #health = 100
  get health() {
    return this.#health
  }

  start() {
    if (this.#isStarted) {
      throw new Error("Car has already started")
    }
    this.#isStarted = true
  }

  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error("Car hasn't started yet")
    }
    this.#isStarted = false
  }

  fillUpGasTank(fuelAmount) {
    if (
      typeof fuelAmount !== "number" ||
      !Number.isFinite(fuelAmount) ||
      !Number.isInteger(fuelAmount) ||
      fuelAmount <= 0
    ) {
      throw new Error("Invalid fuel amount")
    }

    if (this.#currentFuelVolume + fuelAmount > this.#maxFuelVolume) {
      throw new Error("Too much fuel")
    }

    if (this.#isStarted) {
      throw new Error("You have to shut down your car first")
    }

    this.#currentFuelVolume += fuelAmount
  }

  drive(speed, duration) {
    if (
      typeof speed !== "number" ||
      !Number.isFinite(speed) ||
      !Number.isInteger(speed) ||
      speed <= 0
    ) {
      throw new Error("Invalid speed")
    }

    if (
      typeof duration !== "number" ||
      !Number.isFinite(duration) ||
      !Number.isInteger(duration) ||
      duration <= 0
    ) {
      throw new Error("Invalid duration")
    }

    if (speed > this.#maxSpeed) {
      throw new Error("Car can't go this fast")
    }

    if (!this.#isStarted) {
      throw new Error("You have to start your car first")
    }

    const requiredFuel = (speed / 100) * this.#fuelConsumption * duration
    const requiredHealth = (speed / 100) * this.#damage * duration

    if (requiredFuel > this.#currentFuelVolume) {
      throw new Error("You don't have enough fuel")
    }

    if (requiredHealth > this.#health) {
      throw new Error("Your car won't make it")
    }

    this.#currentFuelVolume -= requiredFuel
    this.#health -= requiredHealth
    this.#mileage += speed * duration
  }

  repair() {
    if (this.#isStarted) {
      throw new Error("You have to shut down your car first")
    }

    if (this.#currentFuelVolume < this.#maxFuelVolume) {
      throw new Error("You have to fill up your gas tank first")
    }

    this.#health = 100
  }

  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume
  }
}
