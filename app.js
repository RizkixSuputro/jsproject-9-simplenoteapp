<<<<<<< HEAD
window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".tile"));
  const playerDisplay = document.querySelector(".display-player");
  const resetBtn = document.querySelector("#reset");
  const announcer = document.querySelector(".announcer");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isGameActive = true;

  const PLAYERX_WON = "PLAYERX_WON";
  const PLAYERO_WON = "PLAYERO_WON";
  const TIE = "TIE";

  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningCondition[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b == c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class = "playerO"> O</span> won';
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class = "playerX">X</span> won';
        break;
      case TIE:
        announcer.innerText = "Tie";
        break;
    }
    announcer.classList.remove("hide");
  };
  const isValidAction = (tile) => {
    if (tile.innerText === "X" || tile.innerText === "O") {
      return false;
    }
    return true;
  };
  const updateBoard = (index) => {
    board[index] = currentPlayer;
  };

  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add("player", `player${currentPlayer}`);

      updateBoard(index);
      handleResultValidation();
      if (isGameActive) changePlayer();
    }
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === "O") {
      changePlayer();
    }
    tiles.forEach((tile) => {
      tile.innerText = "";
      tile.classList.remove("playerX");
      tile.classList.remove("playerO");
    });
  };
  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
  });

  resetBtn.addEventListener("click", resetBoard);
});
=======
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
>>>>>>> 8e3c22721d0b82a95b0bc354498f737fb069263b
