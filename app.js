let notes = JSON.parse(localStorage.getItem("notes")) || [];

const formNotes = document.getElementById("note");
const noteTitle = document.getElementById("title");
const noteContent = document.getElementById("note-content");
const noteList = document.getElementById("notelist");

formNotes.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (!title || !content) {
    alert("Mohon isi dari judul dan isi catatan");
    return;
  }
  const note = {
    id: Date.now(),
    title,
    content,
  };

  const exitNoteIndex = notes.findIndex((n) => n.id === note.id);
  if (exitNoteIndex !== -1) {
    notes[exitNoteIndex] = note;
  } else {
    notes.push(note);
  }

  updateUi();

  formNotes.reset();
  saveNotes();
});

function updateUi() {
  noteList.innerHTML = "";
  notes.forEach((note) => {
    const noteItem = document.createElement("li");
    noteItem.classList.add("note-item");

    noteItem.innerHTML = `
   <div>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
    </div>
    <div class = "notes-action">
      <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
      <button class="del-btn" onclick="delNote(${note.id})">Delete</button>
    </div>
  `;

    noteList.appendChild(noteItem);
  });
}

function editNote(id) {
  const note = notes.find((n) => n.id === id);
  if (note) {
    noteTitle.value = note.title;
    noteContent.value = note.content;

    delNote(id);
  }
}

function delNote(id) {
  notes = notes.filter((note) => note.id !== id);
  updateUi();
  saveNotes();
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

updateUi();
