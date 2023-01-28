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
  return { gameBoard, clean, fitVal, print };
};

const status = document.getElementById("status");

const Pos01 = document.getElementById("0");
const Pos02 = document.getElementById("1");
const Pos03 = document.getElementById("2");
const Pos11 = document.getElementById("3");
const Pos12 = document.getElementById("4");
const Pos13 = document.getElementById("5");
const Pos21 = document.getElementById("6");
const Pos22 = document.getElementById("7");
const Pos23 = document.getElementById("8");

const Player = (name, choice) => {
  const selectMove = (num) => {};
  return { name, choice, selectMove };
};

//let Player1 = Player("Player X", "x");
//let Player2 = Player("Player O", "o");

let gameBoard = GameBoard();
let squares = document.querySelectorAll(".square");

squares.forEach((element) => {
  element.addEventListener("click", function () {
    element.textContent = "X";
    gameBoard.fitVal(Number(element.id), "x");
  });
});

//status.innerText = "Player X moves";

//} while();
// quien empieza
// como se gana
