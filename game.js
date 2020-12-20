// In the array below, the first entry represents the square at the top left row, then next one the next square to the left, etc.
// Green = contains a green circle, etc. 

var square, board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty", "empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","gold"] 

var gameInProgress = false 
var humanDirection = 4  // 0 = up, 1 = down, 2 = left, 3 = right, 4 = no move
var circleObjects = [] // To store human player, computer player and gold circle objects.
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

function startGame(){
	addActionListeners
	gameInProgress = true
	humanDirection = 4   
	circleObjects[0] = {type: 'green', square: 0} // Human player
	circleObjects[1] = {type: 'gold', square: 63} // Gold square (human wins points on reaching this square)
	circleObjects[2] = {type: 'red', square: 56} // Red square - computer player (human's opponent)
	// inGameActions() function runs immediately, and then every 500 milliseconds thereafter. 
	inGameActions()
	if (gameInProgress){setInterval(function(){inGameActions()},500)}
}

function inGameActions(){
		millisecondsElapsed += 500
		// Message if human selects invalid move
		if (!isHumanMoveValid){
			document.getElementById("message1").textContent = "Invalid move"
			humanDirection = 4}
		else {document.getElementById("message1").textContent = " "}
		setNewHumanSquare()
		computerPlayerMoves()
		winsPointsActions() // If human player has landed on a square containing a gold circle.
		humanLoses() // If the human player has collided with a computer player.
		// New computer oppoent added every 20 seconds till there are 4 computer opponents.
		if (millisecondsElapsed % 20000 == 0 && numberOfComputerOppoments < 5){
			newComputerPlayer(findFreeSquare())
			numberOfComputerOpponents++}
		updateBoard() // Re-populates the board
		document.getElementById("score").textContent = "Score: " + score //Updates score
		var humanDirection = 4 // Resetting human movement to stationary post-move
}

function setNewHumanSquare() {}

function humanLoses() {} // TBC
function winsPointsActions() {} // TBC
function updateBoard(){} //TBC

function isHumanMoveValid(directionOfMovement){} //TBC

function addDirectionEventListeners(userChoice){
	if (gameInProgress){
		if(userChoice == 'UP') {humanDirection = 0}
		if(userChoice == 'DOWN') {humanDirection = 1}
		if(userChoice == 'LEFT') {humanDirection = 2}
		if(userChoice == 'RIGHT') {humanDirection = 3}
		}
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
	if (isHumanMoveValid("UP")) {document.getElementById("UP").addEventListener("click", addDirectionEventListeners("UP"))}
	if (isHumanMoveValid("DOWN")) {document.getElementById("DOWN").addEventListener("click", addDirectionEventListeners("DOWN"))}
	if (isHumanMoveValid("LEFT")) {document.getElementById("LEFT").addEventListener("click", addDirectionEventListeners("LEFT"))}
	if (isHumanMoveValid("RIGHT")) {document.getElementById("RIGHT").addEventListener("click", addDirectionEventListeners("RIGHT"))}
	document.getElementById("NEW-GAME").addEventListener("click", function() {location.reload})
}