(function () {
  // You can do this a factory function and avoid use so many this!!!!
  playTTT = {
    gameBoard: [],
    Xterm: true,
    moves: 0,
    gameOver: false,

    init: function () {
      this.createBoard();
      this.cacheDOM();
      this.bindEvents();
    },

    cacheDOM: function () {
      this.status = document.getElementById("status");
      this.turn = document.getElementById("turn");
      this.squares = document.querySelectorAll(".square");
      this.btnReset = document.getElementById("reset");
    },

    createBoard: function () {
      for (let i = 0; i < 9; i++) {
        this.gameBoard.push(this.Board());
      }
    },

    bindEvents: function () {
      this.squares.forEach((element) => {
        element.addEventListener(
          "click",
          function () {
            if (element.textContent === "" && this.gameOver === false) {
              if (this.Xterm) {
                element.textContent = "X";
                this.gameBoard[Number(element.id)].fitValue("x");
                this.turn.textContent = "O follow´s";
              } else {
                element.textContent = "O";
                this.gameBoard[Number(element.id)].fitValue("o");
                turn.textContent = "X follow´s";
              }
              this.isWinner();
              this.Xterm = !this.Xterm;
            }
          }.bind(this)
        );
      });

      this.btnReset.addEventListener("click", this.reset.bind(this));
    },

    Board: function () {
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
    },

    isWinner: function () {
      this.moves++;
      if (this.moves > 2) {
        for (let y = 0; y < 3; y++) {
          let elementWinner = this.gameBoard[y * 3].getValue();
          if (elementWinner !== "") {
            if (
              elementWinner === this.gameBoard[y * 3 + 1].getValue() &&
              elementWinner === this.gameBoard[y * 3 + 2].getValue()
            ) {
              this.EndGame(elementWinner, y * 3, y * 3 + 1, y * 3 + 2);
            }
          }
        }
        for (let y = 0; y < 3; y++) {
          let elementWinner = this.gameBoard[y].getValue();
          if (elementWinner !== "") {
            if (
              elementWinner === this.gameBoard[y + 3].getValue() &&
              elementWinner === this.gameBoard[y + 6].getValue()
            ) {
              this.EndGame(elementWinner, y, y + 3, y + 6);
            }
          }
        }
        if (
          this.gameBoard[0].getValue() !== "" &&
          this.gameBoard[0].getValue() === this.gameBoard[4].getValue() &&
          this.gameBoard[0].getValue() === this.gameBoard[8].getValue()
        ) {
          this.EndGame(this.gameBoard[0].getValue(), 0, 4, 8);
        }
        if (
          this.gameBoard[2].getValue() !== "" &&
          this.gameBoard[2].getValue() === this.gameBoard[4].getValue() &&
          this.gameBoard[2].getValue() === this.gameBoard[6].getValue()
        ) {
          this.EndGame(this.gameBoard[2].getValue(), 2, 4, 6);
        }
      }
      if (this.moves === 9 && this.gameOver === false) {
        this.gameOver = true;
        this.status.textContent = `This is a draw`;
      }
    },

    EndGame: function (valWinner, a, b, c) {
      this.gameOver = true;
      this.status.textContent = `The Winner is ${valWinner}`;
      this.turn.textContent = "Congratulations!!!";
      this.squares.forEach((element) => {
        if (
          Number(element.id) === a ||
          Number(element.id) === b ||
          Number(element.id) === c
        ) {
          element.style.backgroundColor = "orange";
        }
      });
    },

    reset: function () {
      this.status.textContent = `Choose "X" or "O", remember always start the "X"`;
      this.turn.textContent = "X starts";
      this.Xterm = true;
      this.moves = 0;
      this.gameOver = false;
      this.squares.forEach((element) => {
        element.textContent = "";
        element.style.backgroundColor = "grey";
      });
      for (let y = 0; y < 9; y++) {
        this.gameBoard[y].cleanValue();
      }
    },
  };

  playTTT.init();
})();
