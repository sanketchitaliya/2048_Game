let rows = 4;
let columns = 4;
let score = 0;
let resetGameId = document.getElementById("resetButton");
let board;

function setGameUi() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let box = document.createElement("div");
      box.classList.add("x2");
      box.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateBox(box, num);
      document.getElementById("main-grid").append(box);
    }
  }
  setTwo();
  setTwo();
}

setGameUi();

function updateBox(box, num) {
  box.innerText = "";
  box.classList.value = "";
  box.classList.add("box");
  if (num > 0) {
    box.innerText = num.toString();

    if (num <= 2048) {
      box.classList.add("x" + num.toString());
    } else {
      box.classList.add("x2048");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);

  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] += row[i];
      row[i + 1] = 0;
      score += row[i];
    }
  }
  row = filterZero(row);
  while (row.length < columns) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let box = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateBox(box, num);
    }
  }

  if (isGameOver()) {
    alert("Game Over!");
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    board[r] = row.reverse();
    for (let c = 0; c < columns; c++) {
      let box = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateBox(box, num);
    }
  }

  if (isGameOver()) {
    alert("Game Over!");
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let box = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateBox(box, num);
    }
  }

  if (isGameOver()) {
    alert("Game Over!");
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let box = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateBox(box, num);
    }
  }

  if (isGameOver()) {
    alert("Game Over!");
  }
}

function resetGame() {
  location.reload();
}

function setTwo() {
  let found = true;

  while (found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let box = document.getElementById(r.toString() + "-" + c.toString());
      box.innerText = "2";
      box.classList.add("x2");
      found = false;
    }
  }
  if (isGameOver()) {
    alert("Game Over!");
  }
}

function isGameOver() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 0) return false;
    }
  }
  return true;
}

resetGameId.addEventListener("click", resetGame);
