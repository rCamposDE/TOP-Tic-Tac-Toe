const Board = () => {
  let value = "";
  const fitValue = (val) => {
    if (val === "x" || val === "o") {
      value = val;
    }
  };
  const cleanValue = () => {
    value = "";
  };
  const getValue = () => value;
  return { fitValue, getValue, cleanValue };
};

const GameBoard = () => {
  //Here we have the GameBoard
  let gameBoard = [];
  for (let i = 0; i < 9; i++) {
    let board = Board();
    gameBoard.push(board);
  }
  const clean = () => {
    gameBoard.forEach((element) => {
      element.cleanValue();
    });
  };
  const fitVal = (num, x) => {
    if (!isNaN(num)) {
      gameBoard[num].fitValue(x);
    }
  };
  const print = () => {
    for (let i = 0; i < 9; i++) {
      console.log(`${i} ${gameBoard[i].getValue()}`);
    }
  };
  const getValueI = (i) => gameBoard[i].getValue();

  return { gameBoard, clean, fitVal, print, getValueI };
};

const status = document.getElementById("status");
const turn = document.getElementById("turn");
const squares = document.querySelectorAll(".square");
const Pos01 = document.getElementById("0");
const Pos02 = document.getElementById("1");
const Pos03 = document.getElementById("2");
const Pos11 = document.getElementById("3");
const Pos12 = document.getElementById("4");
const Pos13 = document.getElementById("5");
const Pos21 = document.getElementById("6");
const Pos22 = document.getElementById("7");
const Pos23 = document.getElementById("8");

let gameBoard = GameBoard();
let Xterm = true;
let moves = 0;
let gameOver = false;

const playTTT = (() => {})();

squares.forEach((element) => {
  element.addEventListener("click", function () {
    if (element.textContent === "" && gameOver === false) {
      if (Xterm) {
        element.textContent = "X";
        gameBoard.fitVal(Number(element.id), "x");
        turn.textContent = "O follow´s";
      } else {
        element.textContent = "O";
        gameBoard.fitVal(Number(element.id), "o");
        turn.textContent = "X follow´s";
      }
      isWinner();
      Xterm = !Xterm;
    }
  });
});

function isWinner() {
  moves++;
  if (moves > 2) {
    for (let y = 0; y < 3; y++) {
      let elementWinner = gameBoard.getValueI(y * 3);
      if (elementWinner !== "") {
        if (
          elementWinner === gameBoard.getValueI(y * 3 + 1) &&
          elementWinner === gameBoard.getValueI(y * 3 + 2)
        ) {
          EndGame(elementWinner);
        }
      }
    }
    for (let y = 0; y < 3; y++) {
      let elementWinner = gameBoard.getValueI(y);
      if (elementWinner !== "") {
        if (
          elementWinner === gameBoard.getValueI(y + 3) &&
          elementWinner === gameBoard.getValueI(y + 6)
        ) {
          EndGame(elementWinner);
        }
      }
    }
    if (
      gameBoard.getValueI(0) !== "" &&
      gameBoard.getValueI(0) === gameBoard.getValueI(4) &&
      gameBoard.getValueI(0) === gameBoard.getValueI(8)
    ) {
      EndGame(gameBoard.getValueI(0));
    }
    if (
      gameBoard.getValueI(2) !== "" &&
      gameBoard.getValueI(2) === gameBoard.getValueI(4) &&
      gameBoard.getValueI(2) === gameBoard.getValueI(6)
    ) {
      EndGame(gameBoard.getValueI(2));
    }
  }
  if (moves === 9 && gameOver === false) {
    gameOver = true;
    status.textContent = `This is a draw`;
  }
}

function EndGame(valWinner) {
  gameOver = true;
  status.textContent = `The Winner is ${valWinner}`;
  turn.textContent = "Congratulations!!!";
}

function reset() {
  status.textContent = `Choose "X" or "O", remember always start the "X"`;
  turn.textContent = "X starts";
  gameBoard.clean();
  Xterm = true;
  moves = 0;
  gameOver = false;
  squares.forEach((element) => (element.textContent = ""));
}
