const Board = () => {
  let value = "";
  const fitValue = (val) => {
    if (value === "" || value === "x" || value === "o") {
      value = val;
    }
  };
  const getValue = () => value;
  return { fitValue, getValue };
};

const GameBoard = () => {
  let gameBoard = [];
  for (let i = 0; i < 13; i++) {
    let element = Board;
    gameBoard.push(element);
  }
  return { gameBoard };
};

const Players = (name, choice) => {
  let getSelection = () => selection;
  return { getSelection };
};
