const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const rows = 8;
const cols = 8;
const tileSize = 50;
canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

let grid = [];
let score = 0;
document.getElementById("score").innerText = score;

// Generate random grid
function initGrid() {
    for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
            grid[r][c] = Math.floor(Math.random() * 5);
        }
    }
}

// Draw the game board
function drawGrid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            ctx.fillStyle = getColor(grid[r][c]);
            ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
            ctx.strokeRect(c * tileSize, r * tileSize, tileSize, tileSize);
        }
    }
}

// Color mapping
function getColor(value) {
    const colors = ["red", "green", "blue", "yellow", "orange"];
    return colors[value];
}

// Restart the game
function restartGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    initGrid();
    drawGrid();
}

// Initialize and draw the game
initGrid();
drawGrid();
