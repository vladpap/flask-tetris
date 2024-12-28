// static/tetris.js
const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const BLOCK_SIZE = 30;
const COLS = 10;
const ROWS = 20;

// Фигуры тетриса
const SHAPES = [
    [[1,1,1,1]], // I
    [[1,1,1],[0,1,0]], // T
    [[1,1,1],[1,0,0]], // L
    [[1,1,1],[0,0,1]], // J
    [[1,1],[1,1]], // O
    [[1,1,0],[0,1,1]], // S
    [[0,1,1],[1,1,0]] // Z
];

const COLORS = [
    '#FF0D72', '#0DC2FF', '#0DFF72',
    '#F538FF', '#FF8E0D', '#FFE138',
    '#3877FF'
];

let score = 0;
let gameOver = false;
let paused = false;
let currentPiece = null;
let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));

class Piece {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
        this.y = 0;
        this.x = Math.floor(COLS / 2) - Math.floor(shape[0].length / 2);
    }
}

function createPiece() {
    const index = Math.floor(Math.random() * SHAPES.length);
    return new Piece(SHAPES[index], COLORS[index]);
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    drawBoard();
    if (currentPiece) {
        drawPiece(currentPiece);
    }
}

function drawBoard() {
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = COLORS[value - 1];
                context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
            }
        });
    });
}

function drawPiece(piece) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = piece.color;
                context.fillRect((piece.x + x) * BLOCK_SIZE,
                               (piece.y + y) * BLOCK_SIZE,
                               BLOCK_SIZE - 1,
                               BLOCK_SIZE - 1);
            }
        });
    });
}

function collide() {
    for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
            if (currentPiece.shape[y][x] &&
                (board[y + currentPiece.y] &&
                board[y + currentPiece.y][x + currentPiece.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function merge() {
    currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                board[y + currentPiece.y][x + currentPiece.x] = SHAPES.indexOf(currentPiece.shape) + 1;
            }
        });
    });
}

function rotate() {
    if (paused || gameOver) return;
    
    const shape = currentPiece.shape;
    const newShape = shape[0].map((val, index) =>
        shape.map(row => row[index]).reverse()
    );
    
    const oldShape = currentPiece.shape;
    currentPiece.shape = newShape;
    
    if (collide()) {
        currentPiece.shape = oldShape;
    }
    draw();
}

function moveLeft() {
    if (paused || gameOver) return;
    currentPiece.x--;
    if (collide()) {
        currentPiece.x++;
    }
    draw();
}

function moveRight() {
    if (paused || gameOver) return;
    currentPiece.x++;
    if (collide()) {
        currentPiece.x--;
    }
    draw();
}

function dropDown() {
    if (paused || gameOver) return;
    currentPiece.y++;
    if (collide()) {
        currentPiece.y--;
        merge();
        checkLines();
        currentPiece = createPiece();
        if (collide()) {
            gameOver = true;
            saveScore();
        }
    }
    draw();
}

function checkLines() {
    let linesCleared = 0;
    
    outer: for (let y = board.length - 1; y >= 0; y--) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }
        
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        linesCleared++;
        y++;
    }
    
    if (linesCleared > 0) {
        score += linesCleared * 100;
        document.getElementById('score').textContent = score;
    }
}

function saveScore() {
    const playerName = document.getElementById('player-name').value || 'Anonymous';
    fetch('/save_score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: playerName,
            score: score
        })
    });
}

// Управление с клавиатуры
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') {
        moveLeft();
    } else if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') {
        moveRight();
    } else if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
        rotate();
    } else if (event.key === ' ') {
        dropDown();
    } else if (event.key.toLowerCase() === 'p') {
        paused = !paused;
    } else if (event.key === 'Escape') {
        gameOver = true;
        saveScore();
    }
});

// Старт игры
function gameLoop() {
    if (!paused && !gameOver) {
        dropDown();
    }
    setTimeout(gameLoop, 1000);
}

currentPiece = createPiece();
draw();
gameLoop();
