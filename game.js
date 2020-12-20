// In the 'board' array below, the first entry represents the square at the top left row, then next one the next square to the left, etc.
// Green = contains a green circle, etc. 
var square, board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty", "empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","gold"] 
var gameInProgress = false 
var humanDirection = "NO MOVEMENT"
var circleObjects = [] // To store human player, computer player and gold circle objects.
circleObjects[0] = {type: 'green', squareNum: 0} // Human player
var millisecondsElapsed = 0
var score = 0
var numberOfComputerOpponents = 1

function createInitialBoard(){
	for(square in board){
		if (board[square] == "empty"){document.write('<div class = "square"></div>') }
		if (board[square] == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>') }
		if (board[square] == "gold"){document.write('<div class = "square"><div class = "gold-circle"></div></div>') }
		if (board[square] == "green"){document.write('<div class = "square"><div class = "green-circle"></div></div>') }
	}
}

// This function is only called when the human player makes a valid initial move. 

function startGame(){
	gameInProgress = true  
	circleObjects[1] = {type: 'gold', squareNum: 63} // Gold square (human wins points on reaching this square)
	circleObjects[2] = {type: 'red', squareNum: 56} // Red square - computer player (human's opponent)
	// The inGameActions() function runs immediately, and then every 500 milliseconds thereafter. 
	inGameActions()
	setInterval(function(){inGameActions()},500)}

function inGameActions(){
		millisecondsElapsed += 500
		gameInProgress = true
		setNewHumanSquare(humanDirection)
		computerPlayerMoves()
		winsPointsActions() // If human player has landed on a square containing a gold circle.
		humanLoses() // If the human player has collided with a computer player.
		// New computer oppoent added every 20 seconds till there are 4 computer opponents.
		if (millisecondsElapsed % 20000 == 0 && numberOfComputerOpponents < 5){
			newComputerPlayer(findFreeSquare())
			numberOfComputerOpponents++}
		updateBoard() // Re-populates the board
		document.getElementById("score").textContent = "Score: " + score //Updates score
		var humanDirection = 4 // Resetting human movement to stationary post-move
}

function setNewHumanSquare(directionOfTravel) {
	
} //TBC

function humanLoses() {} // TBC
function winsPointsActions() {} // TBC
function updateBoard(){} //TBC

function isHumanMoveValid(directionOfMovement){
	var currentSquare = circleObjects[0].squareNum
	// Checks situations where the move would be out of bounds
	var onTopRow = currentSquare <= 7
	if (onTopRow && directionOfMovement = "UP")
		{return false}
	var onFarLeftCol = (currentSquare % 8 == 0)
	if (onFarLeftCol && directionOfMovement = "LEFT")
		{return false}
	var farRightColSquareNums = [7, 15, 23, 31, 39, 47, 55, 63]
	var onFarRightCol = farRightColSquareNums.includes(currentSquare)
	if (onFarRightCol && directionOfMovement = "RIGHT")
		{return false}
	var onBottomRow = (currentSquare >= 56 && currentSquare <= 63)
	if (onBottomRow && directionOfMovement = "DOWN")
		{return false}} 

function setHumanDirection(userChoice){
		if(userChoice == 'UP' && isHumanMoveValid(userChoice)) {humanDirection = userChoice}
		if(userChoice == 'DOWN'&& isHumanMoveValid(userChoice)) {humanDirection = userChoice}
		if(userChoice == 'LEFT' isHumanMoveValid(userChoice)) {humanDirection = userChoice}
		if(userChoice == 'RIGHT' isHumanMoveValid(userChoice)) {humanDirection = userChoice}
		// Message if human selects invalid move
		if (!isHumanMoveValid(userChoice){
			document.getElementById("message1").textContent = "Invalid move"}
		else {
			document.getElementById("message1").textContent = "You clicked " + userChoice}
		// New game is move is valid and game not already in progress. 
		if (humanDirection != "NO MOVEMENT" && !gameInProgress){startGame()} 
		}

function humanPlayerMove(){} //TBC

function computerPlayerMoves(){
	for (spriteObject in circleObjects){
		if (spriteObject.type != 'red') {continue}
		spriteObject.direction = getDirection(spriteObject) 
	}
}

// Returns an int. 0 = up, 1 = down, 2 = left, 3 = right, 4 = no valid move
function getDirection(spriteObject){
	if (!doesValidMoveExist(spriteObject)){return 4}
	var randomDirection = Math.floor(Math.random() * 3)   
	if (isNotValidMove(spriteObject)){getDirection(spriteObject)}
	return randomDirection
}

function doesValidMoveExist(spriteObject){} //TBC

function playerEliminated(){ } //TBC

function newGameClicked(){ }//TBC

function newComputerPlayer(initialSquare){
	this.square = initialSquare } //TBC


function newGoldCircleObject(squareNum){
	} //TBC

function isSquareFree(squareNum){
	//Checks if a square is free for a new object to occupy. TBC
}

function setSquare(squareNumber, spriteObject) { } //Sets a new square for the 'this' object. 

function removePreviousGameMessages() { } //TBC

function findFreeSquare(){} //TBC

function addActionListeners() {
	document.getElementById("UP").addEventListener("click", setHumanDirection("UP"))
	document.getElementById("DOWN").addEventListener("click", setHumanDirection("DOWN"))
	document.getElementById("LEFT").addEventListener("click", setHumanDirection("LEFT"))
	document.getElementById("RIGHT").addEventListener("click", setHumanDirection("RIGHT"))
	document.getElementById("RESTART").addEventListener("click", function() {location.reload})
}