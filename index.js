let notes = []

function validateInput(inputElement, minLength, maxLength) {
  const inputValue = inputElement.value.trim()
  const inputRegex = new RegExp(`^.{${minLength},${maxLength}}$`)

  if (inputValue === "") {
    inputElement.style.backgroundColor = "red"
    return false
  }

  if (!inputRegex.test(inputValue)) {
    inputElement.style.backgroundColor = "red"
    return false
  }

  inputElement.style.backgroundColor = "" // Reset the background color
  return true
}

function getCurrentDateTime() {
  const now = new Date()
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }
  return now.toLocaleDateString("en-US", options)
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes))
}

function loadNotes() {
  const savedNotes = localStorage.getItem("notes")
  if (savedNotes) {
    notes = JSON.parse(savedNotes)
  }
}

function renderNotes() {
  const notesContainer = document.getElementById("notes")
  notesContainer.innerHTML = ""

  notes.forEach((note, index) => {
    const noteElement = createNoteElement(note, index)
    notesContainer.appendChild(noteElement)
  })
}

function addNote() {
  const titleInput = document.getElementById("titleInput")
  const textInput = document.getElementById("textInput")
  const colorSelect = document.getElementById("colorSelect")

  if (!validateInput(titleInput, 5, 15) || !validateInput(textInput, 5, 100)) {
    return
  }

  const title = titleInput.value.trim()
  const text = textInput.value.trim()
  const color = colorSelect.value

  const note = {
    title: title,
    text: text,
    createdDate: getCurrentDateTime(),
    updated: false,
    color: color,
  }

  notes.push(note)
  saveNotes()
  renderNotes()

  titleInput.value = ""
  textInput.value = ""
  titleInput.focus()
}

function deleteNote(index) {
  const confirmDelete = confirm("Are you sure you want to delete this note?")
  if (confirmDelete) {
    notes.splice(index, 1)
    saveNotes()
    renderNotes()
  }
}

function searchNotes() {
  const searchInput = document.getElementById("searchInput")
  const searchTerm = searchInput.value.toLowerCase()

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchTerm)
  })

  const notesContainer = document.getElementById("notes")
  notesContainer.innerHTML = ""

  filteredNotes.forEach((note, index) => {
    const noteElement = createNoteElement(note, index)
    notesContainer.appendChild(noteElement)
  })
}

function createNoteElement(note, index) {
  const noteElement = document.createElement("div")
  noteElement.classList.add("note")
  noteElement.style.backgroundColor = note.color
  noteElement.id = `note-${index}`

  const titleElement = document.createElement("h3")
  titleElement.innerText = note.title
  titleElement.classList.add("note-title")

  const textElement = document.createElement("p")
  textElement.innerText = note.text
  textElement.classList.add("note-text")

  const dateElement = document.createElement("p")
  dateElement.innerText = note.updated
    ? `Updated ${note.createdDate}`
    : note.createdDate
  dateElement.classList.add("note-date")

  const updateButton = document.createElement("button")
  updateButton.innerHTML = '<i class="fa fa-edit"> Edit</i>'
  updateButton.classList.add("update-button")
  updateButton.addEventListener("click", () => {
    editNoteElement(note, index)
  })

  const deleteButton = document.createElement("button")
  deleteButton.innerHTML = '<i class="fa fa-trash"> Delete</i>'
  deleteButton.classList.add("delete-button")
  deleteButton.addEventListener("click", () => {
    deleteNote(index)
  })

  noteElement.appendChild(titleElement)
  noteElement.appendChild(textElement)
  noteElement.appendChild(dateElement)
  noteElement.appendChild(deleteButton)
  noteElement.appendChild(updateButton)

  return noteElement
}

function editNoteElement(note, index) {
  const noteElement = document.getElementById(`note-${index}`)

  const titleElement = document.createElement("input")
  titleElement.type = "text"
  titleElement.value = note.title
  titleElement.classList.add("note-title-input")

  const textElement = document.createElement("textarea")
  textElement.value = note.text
  textElement.classList.add("note-textarea")

  const confirmButton = document.createElement("button")
  confirmButton.innerHTML = '<i class="fa fa-check"> Confirm</i>'
  confirmButton.classList.add("confirm-button")
  confirmButton.addEventListener("click", () => {
    const updatedTitle = titleElement.value.trim()
    const updatedText = textElement.value.trim()

    if (
      !validateInput(titleElement, 5, 15) ||
      !validateInput(textElement, 5, 100)
    ) {
      return
    }

    note.title = updatedTitle
    note.text = updatedText
    note.updated = true
    note.createdDate = getCurrentDateTime()

    saveNotes()
    renderNotes()
  })

  const cancelButton = document.createElement("button")
  cancelButton.innerHTML = '<i class="fa fa-times"> Cancel</i>'
  cancelButton.classList.add("cancel-button")
  cancelButton.addEventListener("click", () => {
    renderNotes()
  })

  noteElement.innerHTML = ""
  noteElement.appendChild(titleElement)
  noteElement.appendChild(textElement)
  noteElement.appendChild(confirmButton)
  noteElement.appendChild(cancelButton)
}

document.getElementById("addButton").addEventListener("click", addNote)
document.getElementById("searchInput").addEventListener("input", searchNotes)

loadNotes()
renderNotes()
