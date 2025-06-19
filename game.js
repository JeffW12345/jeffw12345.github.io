// Game state
var board = new Array(64).fill("empty");
board[0] = "green";
board[63] = "orange";
board[56] = "red";

var gameInProgress = false;
var humanDirection = "NO MOVEMENT";
var circleObjects = [
    { colour: 'green', squareNum: 0 },
    { colour: 'orange', squareNum: 63 },
    { colour: 'red', squareNum: 56 }
];
var millisecondsElapsed = 0;
var score = 0;
var numberOfComputerOpponents = 1;
var intervalSetter;

// Build the board in DOM
function createInitialBoard() {
    const container = document.getElementById("game-board");
    container.innerHTML = "";
    for (let i = 0; i < 64; i++) {
        const sq = document.createElement("div");
        sq.className = "square";
        container.appendChild(sq);
    }
    updateBoardView();
}
createInitialBoard();

function updateBoardView() {
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < board.length; i++) {
        squares[i].innerHTML = '';
        if (board[i] === "green") squares[i].innerHTML = '<div class="green-circle"></div>';
        if (board[i] === "red") squares[i].innerHTML = '<div class="red-circle"></div>';
        if (board[i] === "orange") squares[i].innerHTML = '<div class="orange-circle"></div>';
        if (board[i] === "black") squares[i].innerHTML = '<div class="black-circle"></div>';
    }
}

function startGame(userChoice) {
    if (userChoice === "RELOAD") return location.reload();
    humanDirection = userChoice;
    gameInProgress = true;
    clearInterval(intervalSetter);
    activateIntervalSetter();
}

function activateIntervalSetter() {
    intervalSetter = setInterval(inGameActions, 240);
}

function inGameActions() {
    moveGreenCircle(humanDirection);
    makeComputerMove();
    updateBoardRepresentation();

    if (circleObjects[0].squareNum === circleObjects[1].squareNum) {
        score += 10;
        circleObjects[1].squareNum = findFreeSquare();
    }

    document.getElementById("score").textContent = "Score: " + score;

    if (isHumanEliminated()) {
        document.getElementById("end-of-game-message").textContent = "You've been eliminated. Press 'RESTART' to play again.";
        ["UP", "DOWN", "LEFT", "RIGHT"].forEach(btn => document.getElementById(btn).disabled = true);
        gameInProgress = false;
    }

    if (millisecondsElapsed > 0 && millisecondsElapsed % 30000 === 0 && numberOfComputerOpponents < 4 && gameInProgress) {
        newComputerPlayer(findFreeSquare());
        numberOfComputerOpponents++;
    }

    updateBoardView();
    humanDirection = "NO MOVEMENT";
    millisecondsElapsed += 240;

    if (!gameInProgress) clearInterval(intervalSetter);
}

function updateBoardRepresentation() {
    const human = circleObjects[0].squareNum;
    const orange = circleObjects[1].squareNum;
    const reds = getRedPlayerSquareNums();
    const occupied = getAllOccupiedSquares();

    for (let i = 0; i < 64; i++) {
        if (!gameInProgress && i === human) board[i] = "black";
        else if (i === human) board[i] = "green";
        else if (i === orange) board[i] = "orange";
        else if (reds.includes(i)) board[i] = "red";
        else if (!occupied.includes(i)) board[i] = "empty";
    }
}

function getAllOccupiedSquares() {
    return circleObjects.map(obj => obj.squareNum);
}

function getRedPlayerSquareNums() {
    return circleObjects.filter(obj => obj.colour === 'red').map(obj => obj.squareNum);
}

function moveGreenCircle(dir) {
    var cur = circleObjects[0].squareNum;
    if (dir === "UP") cur = cur > 7 ? cur - 8 : cur + 56;
    if (dir === "DOWN") cur = cur < 56 ? cur + 8 : cur - 56;
    if (dir === "LEFT") cur = (cur % 8 === 0 ? cur + 7 : cur - 1);
    if (dir === "RIGHT") cur = (cur % 8 === 7 ? cur - 7 : cur + 1);
    circleObjects[0].squareNum = cur;
}

function makeComputerMove() {
    for (let sprite of circleObjects) {
        if (sprite.colour !== 'red') continue;
        const dir = getDirection(sprite);
        setNewSquare(sprite, dir);
        updateBoardRepresentation();
    }
}

function setNewSquare(sprite, direction) {
    const map = { "UP": -8, "DOWN": 8, "LEFT": -1, "RIGHT": 1 };
    sprite.squareNum += (map[direction] || 0);
}

function getDirection(sprite) {
    if (!doesValidMoveExist(sprite)) return "NO MOVEMENT";
    while (true) {
        const r = Math.floor(Math.random() * 4);
        if (isProposedComputerMoveValid(sprite, r)) return ["UP","DOWN","LEFT","RIGHT"][r];
    }
}

function isProposedComputerMoveValid(sprite, d) {
    const cur = sprite.squareNum;
    const reds = getRedPlayerSquareNums();
    const orange = circleObjects[1].squareNum;
    if (d === 0 && (cur <= 7 || reds.includes(cur-8) || orange === cur-8)) return false;
    if (d === 1 && (cur >= 56 || reds.includes(cur+8) || orange === cur+8)) return false;
    if (d === 2 && (cur % 8 === 0 || reds.includes(cur-1) || orange === cur-1)) return false;
    if (d === 3 && (cur % 8 === 7 || reds.includes(cur+1) || orange === cur+1)) return false;
    return true;
}

function doesValidMoveExist(sprite) {
    const i = sprite.squareNum;
    return (
        (i % 8 !== 0 && !["red","orange"].includes(board[i-1])) ||
        (i % 8 !== 7 && !["red","orange"].includes(board[i+1])) ||
        (i > 7   && !["red","orange"].includes(board[i-8])) ||
        (i < 56  && !["red","orange"].includes(board[i+8]))
    );
}

function findFreeSquare() {
    let a;
    do { a = Math.floor(Math.random() * 64); } 
    while (board[a] !== "empty");
    return a;
}

function isHumanEliminated() {
    return getRedPlayerSquareNums().includes(circleObjects[0].squareNum);
}

function newComputerPlayer(pos) {
    circleObjects.push({ colour: 'red', squareNum: pos });
}
