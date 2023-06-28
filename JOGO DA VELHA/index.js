const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const CurrentPlayer = document.querySelector(".CurrentPlayer");
const square = document.querySelectorAll(".square");
const start = document.getElementById("start");
let EndGame = false;

start.addEventListener("click", function () {
  let gameEnded = false;
  CurrentPlayer.textContent = "JOGADOR DA VEZ: " + player1.value;

  square.forEach(function (option) {
    option.textContent = "";
    option.addEventListener("click", GamePlay);

    function GamePlay() {
      let lastPlayer = "";
      if (CurrentPlayer.textContent == "JOGADOR DA VEZ: " + player1.value) {
        option.textContent = "X";
        option.style.color = "red";
        CurrentPlayer.textContent = "JOGADOR DA VEZ: " + player2.value;
        lastPlayer = player1.value;
      } else {
        option.textContent = "O";
        option.style.color = "blue";
        CurrentPlayer.textContent = "JOGADOR DA VEZ: " + player1.value;
        lastPlayer = player2.value;
      }
      option.removeEventListener("click", GamePlay);

      if (checkWin()) {
        endGame(false);
      } else if (isBoardFull()) {
        endGame(true);
      }

      function checkWin() {
        let WinningSequences = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (let combination of WinningSequences) {
          const [a, b, c] = combination;

          if (
            square[a].textContent === square[b].textContent &&
            square[a].textContent === square[c].textContent &&
            square[a].textContent !== ""
          ) {
            return true;
          }
        }
        return false;
      }

      function isBoardFull() {
        return [...square].every((square) => square.textContent !== "");
      }

      function endGame(isDraw) {
        gameEnded = true;

        if (isDraw) {
          CurrentPlayer.textContent = "O jogo terminou em empate!";
        } else {
          CurrentPlayer.textContent = "O jogador(a) " + lastPlayer + " venceu!";
        }
      }
    }
  });
});
