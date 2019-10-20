const game = (() => {
  let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let totalMoves = 0;

  const switchTurn = () => {
    let temp = player1.turn;
    player1.turn = player2.turn;
    player2.turn = temp;
  };

  const winCheck = () => {
    let win = false;

    for (let i = 0; i < 9; i+=3) {
      if (gameboard[i] == gameboard[i + 1]  && gameboard[i + 1] == gameboard[i + 2]) {
        win = true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (gameboard[i] == gameboard[i + 3] && gameboard[i + 3] == gameboard[i + 6]) {
        win = true;
      }
    }

    if (gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8]) {
      win = true;
    }

    if (gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6]) {
      win = true
    }
    return win;
  }

  return {gameboard, totalMoves, switchTurn, winCheck}
})();

const Player = (name, user_id, symbol) => {
  const getName = () => name;
  const getID = () => user_id;
  const getSymbol = () => symbol;
  const turn = false;

  return {getName, getID, getSymbol, turn}
};

const player1 = Player('Player 1', 1, 'X');
const player2 = Player('Player 2', 2, 'O');

for (let i = 0; i < 9; i++) {
  game.gameboard[i] = i + 1;
}

let grid = document.querySelectorAll('td');
let newGame = document.querySelector('button');

for (let i = 0; i < grid.length; i++) {
  const element = grid[i];
  element.setAttribute('id', 'box' + (i + 1).toString(10));
}

player1.turn = true;
document.getElementById('player1').setAttribute('class', 'player-move');

grid.forEach(box => {
  box.addEventListener('click', () => {
    if(box.innerText == 'X' || box.innerText == 'O') return;

    if (player1.turn) {
      box.innerText = player1.getSymbol();

      document.getElementById('player1').removeAttribute('class');
      document.getElementById('player2').setAttribute('class', 'player-move');
    } else {
      box.innerText = player2.getSymbol();

      document.getElementById('player2').removeAttribute('class');
      document.getElementById('player1').setAttribute('class', 'player-move');
    }

    let boxId = box.getAttribute('id');
    let index = boxId.charAt(boxId.length - 1) - 1;

    game.gameboard[index] = box.innerText;
    console.log(game.gameboard);

    if (game.winCheck()) {
      let winner;

      if (player1.turn) winner = player1.getName();
      if (player2.turn) winner = player2.getName();

      document.querySelector('body').innerHTML += `<h2>${winner} wins!</h2>`

      newGame = document.querySelector('button');

      newGame.addEventListener('click', () => {
        window.location.reload();
      })
    } else {
      if (++game.totalMoves == 9) {
        document.querySelector('body').innerHTML += `<h2>It's a tie!</h2>`
      }

      newGame = document.querySelector('button');
      newGame.addEventListener('click', () => {
        window.location.reload();
      })
    }

    game.switchTurn();
  });
});

newGame.addEventListener('click', () => {
  window.location.reload();
})
