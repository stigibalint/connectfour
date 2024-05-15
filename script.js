// Karika játék tábla generálása
const gameBoard = document.querySelector('.game-board');

for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        gameBoard.appendChild(circle);
    }
}
function checkWin() {
    const circles = document.querySelectorAll('.circle');

    function checkLine(a, b, c, d) {
        return a.classList.contains('player1') && 
               b.classList.contains('player1') &&
               c.classList.contains('player1') && 
               d.classList.contains('player1') ||
               a.classList.contains('player2') && 
               b.classList.contains('player2') &&
               c.classList.contains('player2') && 
               d.classList.contains('player2');
    }

    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            if (
                checkLine(
                    circles[row * 7 + col],
                    circles[row * 7 + col + 1],
                    circles[row * 7 + col + 2],
                    circles[row * 7 + col + 3]
                )
            ) {
                return true;
            }
            if (
                checkLine(
                    circles[row * 7 + col],
                    circles[(row + 1) * 7 + col],
                    circles[(row + 2) * 7 + col],
                    circles[(row + 3) * 7 + col]
                )
            ) {
                return true;
            }
            if (
                checkLine(
                    circles[row * 7 + col],
                    circles[(row + 1) * 7 + col + 1],
                    circles[(row + 2) * 7 + col + 2],
                    circles[(row + 3) * 7 + col + 3]
                )
            ) {
                return true;
            }
            if (
                checkLine(
                    circles[row * 7 + col],
                    circles[(row + 1) * 7 + col - 1],
                    circles[(row + 2) * 7 + col - 2],
                    circles[(row + 3) * 7 + col - 3]
                )
            ) {
                return true;
            }
        }
    }

    return false;
}

function dropCircle(circle) {
    let column = circle.cellIndex;
    let cells = document.querySelectorAll(`.circle:nth-child(${column + 1})`);
    for (let i = cells.length - 1; i >= 0; i--) {
        if (!cells[i].classList.contains('player1') && !cells[i].classList.contains('player2')) {
            if (currentPlayer === 1) {
                cells[i].classList.add('player1');
                currentPlayer = 2;
            } else {
                cells[i].classList.add('player2');
                currentPlayer = 1;
            }
            if (checkWin()) {
                if (currentPlayer === 1) {
                    document.getElementById('player2-score').innerText++;
                    alert('Player 2 wins!');
                } else {
                    document.getElementById('player1-score').innerText++;
                    alert('Player 1 wins!');
                }
                resetGame();
            }
            break;
        }
    }
}

function resetGame() {
    circles.forEach(circle => {
        circle.classList.remove('player1');
        circle.classList.remove('player2');
    });
    currentPlayer = 1;
}
