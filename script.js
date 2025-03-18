
// Match-3 Puzzle Game (JavaScript)

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const rows = 8;
const cols = 8;
const tileSize = 50;
canvas.width = cols * tileSize;
canvas.height = rows * tileSize;

let grid = [];
let score = 0;
let selectedTile = null;
document.getElementById("score").innerText = score;

// Generate random grid with no initial matches
function initGrid() {
    do {
        for (let r = 0; r < rows; r++) {
            grid[r] = [];
            for (let c = 0; c < cols; c++) {
                grid[r][c] = Math.floor(Math.random() * 5);
            }
        }
    } while (findMatches().length > 0);
}

// Draw the game board
function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

// Swap two tiles
function swapTiles(r1, c1, r2, c2) {
    let temp = grid[r1][c1];
    grid[r1][c1] = grid[r2][c2];
    grid[r2][c2] = temp;
}

// Handle click events for tile selection
canvas.addEventListener("click", function(event) {
    let col = Math.floor(event.offsetX / tileSize);
    let row = Math.floor(event.offsetY / tileSize);

    if (selectedTile) {
        let [prevRow, prevCol] = selectedTile;
        if (isAdjacent(row, col, prevRow, prevCol)) {
            swapTiles(row, col, prevRow, prevCol);
            let matches = findMatches();
            if (matches.length > 0) {
                score += matches.length * 10;
                document.getElementById("score").innerText = score;
                removeMatches(matches);
            } else {
                swapTiles(row, col, prevRow, prevCol);
            }
            selectedTile = null;
        } else {
            selectedTile = [row, col];
        }
    } else {
        selectedTile = [row, col];
    }

    drawGrid();
});

// Check if two tiles are adjacent
function isAdjacent(r1, c1, r2, c2) {
    return (Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1;
}

// Find matches
function findMatches() {
    let matches = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 2; c++) {
            if (grid[r][c] !== null && grid[r][c] === grid[r][c + 1] && grid[r][c] === grid[r][c + 2]) {
                matches.push([r, c], [r, c + 1], [r, c + 2]);
            }
        }
    }
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
            if (grid[r][c] !== null && grid[r][c] === grid[r + 1][c] && grid[r][c] === grid[r + 2][c]) {
                matches.push([r, c], [r + 1, c], [r + 2, c]);
            }
        }
    }
    return matches;
}

// Remove matches and shift tiles down
function removeMatches(matches) {
    matches.forEach(([r, c]) => grid[r][c] = null);
    for (let c = 0; c < cols; c++) {
        let emptySpaces = 0;
        for (let r = rows - 1; r >= 0; r--) {
            if (grid[r][c] === null) {
                emptySpaces++;
            } else if (emptySpaces > 0) {
                grid[r + emptySpaces][c] = grid[r][c];
                grid[r][c] = null;
            }
        }
        for (let r = 0; r < emptySpaces; r++) {
            grid[r][c] = Math.floor(Math.random() * 5);
        }
    }
    setTimeout(() => {
        let newMatches = findMatches();
        if (newMatches.length > 0) {
            removeMatches(newMatches);
        }
        drawGrid();
    }, 300);
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
