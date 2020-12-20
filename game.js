// In the 'board' array below, the first entry represents the square at the top left row, then next one the next square to the left, etc.
// Green = contains a green circle, etc. 
var square, board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty", "empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","gold"] 
var gameInProgress = false 
var humanDirection = "NO MOVEMENT"
var circleObjects = [] // To store human player, computer player and gold circle (prize) objects.
circleObjects[0] = {colour: 'green', squareNum: 0} // Human player
var millisecondsElapsed = 0
var score = 0
var numberOfComputerOpponents = 1

function createInitialBoard(){
	for(square in board){
		if (board[square] == "empty"){document.write('<div class = "square"></div>')}
		if (board[square] == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>')}
		if (board[square] == "gold"){document.write('<div class = "square"><div class = "gold-circle"></div></div>')}
		if (board[square] == "green"){document.write('<div class = "square"><div class = "green-circle"></div></div>')}
	}
}

// This function is only called when the human player makes a valid initial move. 

function startGame(){
	gameInProgress = true  
	circleObjects[1] = {colour: 'gold', squareNum: 63} // Gold square (human wins points on reaching this square)
	circleObjects[2] = {colour: 'red', squareNum: 56} // Red square - computer player (human's opponent)
	// The inGameActions() function runs immediately, and then every 500 milliseconds thereafter. 
	inGameActions()
	setInterval(function(){inGameActions()},500)}

function inGameActions(){
		gameInProgress = true
		setNewHumanSquare(humanDirection)
		makeComputerMove()
		winsPointsActions() // If human player has landed on a square containing a gold circle.
		humanLoses() // If the human player has collided with a computer player.
		updateBoardRepresentation()
		// New computer oppoent added every 20 seconds till there are 4 computer opponents.
		if (millisecondsElapsed % 20000 == 0 && numberOfComputerOpponents < 5){
			newComputerPlayer(findFreeSquare())
			numberOfComputerOpponents++}
		updateBoardRepresentation()
		updateBoard() // Re-populates the board
		document.getElementById("score").textContent = "Score: " + score //Updates score
		humanDirection = "NO MOVEMENT" // Resetting human movement to stationary post-move
		millisecondsElapsed += 500
		}


function updateBoardRepresentation(){
	humanSquareNum = circleObjects[0].squareNum
	goldCircleNum = circleObjects[1].squareNum
	redPlayerSquareNums = getRedPlayerSquareNums()
	var count = 0
	var squareEmpty = true;
	for(square in board){
		if (humanSquareNum == count) {
			square == "green"
			squareEmpty = false
		}
		if (goldCircleNum == count) {
			square == "gold"
			squareEmpty = false}
		if (redPlayerSquareNums.includes(count)) {
			square = "red"
			squareEmpty = false}
		if (squareEmpty) {
			square = "empty"
		}
	}
}

function getRedPlayerSquareNums(){
	var redCircleNums = []
	for (object in circleObjects){
		if (object.colour = 'red') {
			redCircleNums.push(object.squareNum)
		}
	}
	return redCircleNums
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
	if (onTopRow && directionOfMovement == "UP")
		{return false}
	var onFarLeftCol = (currentSquare % 8 == 0)
	if (onFarLeftCol && directionOfMovement == "LEFT")
		{return false}
	var farRightColSquareNums = [7, 15, 23, 31, 39, 47, 55, 63]
	var onFarRightCol = farRightColSquareNums.includes(currentSquare)
	if (onFarRightCol && directionOfMovement == "RIGHT")
		{return false}
	var onBottomRow = (currentSquare >= 56 && currentSquare <= 63)
	if (onBottomRow && directionOfMovement == "DOWN")
		{return false}
	return true;
	} 

function setHumanDirection(userChoice){
		if(isHumanMoveValid(userChoice)) {humanDirection = userChoice}
		// Message if human selects invalid move
		if (!isHumanMoveValid(userChoice)){
			document.getElementById("message1").textContent = "Invalid move"}
		else {
			document.getElementById("message1").textContent = "You clicked " + userChoice}
		// New game is move is valid and game not already in progress. 
		if (humanDirection != "NO MOVEMENT" && !gameInProgress){startGame()} 
	}


function makeComputerMove(){
	for (spriteObject in circleObjects){
		if (spriteObject.colour != 'red') {continue}
		var directionOfTravel = getDirection(spriteObject)
		setNewSquare(spriteObject, directionOfTravel)
	}
}
 
function setNewSquare(spriteObject, directionOfTravel){
	existingSquare = spriteObject.squareNum
	var newSquare  = 0
	if (directionOfTravel == "NO MOVEMENT") {newSquare = existingSquare}
	if (directionOfTravel == "UP") {newSquare += (existingSquare - 8)}
	if (directionOfTravel == "DOWN") {newSquare += (existingSquare + 8)}
	if (directionOfTravel == "LEFT") {newSquare += (existingSquare - 1)}
	if (directionOfTravel == "RIGHT") {newSquare += (existingSquare + 1)}
}

function getDirection(spriteObject){
	if (!doesValidMoveExist(spriteObject)){return "NO MOVEMENT"}
	// For code below, 0 = up, 1 = down, 2 = left, 3 = right
	var randomDirection = Math.floor(Math.random() * 3)
	while (true){
		if(isValidComputerMove(spriteObject, randomDirection))
			{break}
		randomDirection = Math.floor(Math.random() * 3)
	}
	if (randomDirection == 0) return "UP"
	if (randomDirection == 1) return "DOWN"
	if (randomDirection == 2) return "LEFT"
	return "RIGHT"
}

// 0 = up, 1 = down, 2 = left, 3 = right
function isValidComputerMove(spriteObject, directionAsInt){}

// Red player cannot occupy same square as another red player or as a gold circle
function doesValidMoveExist(redPlayer){
	currentSquareNumber = redPlayer.squareNum
	// Is a move to the left possible?
	if (currentSquareNumber % 8 != 0){
		if(board[currentSquareNumber - 1] != "red" && board[currentSquareNumber - 1] != "gold"){
		return true}
	// Is a move to the right possible?
	var farRightColSquareNums = [7, 15, 23, 31, 39, 47, 55, 63]
	var onFarRightCol = farRightColSquareNums.includes(currentSquare)
	if (!onFarRightCol) {
		if(board[currentSquareNumber + 1] != "red" && board[currentSquareNumber + 1] != "gold"){
		return true}
	// Is a move upwards possible?
	var onTopRow = currentSquareNumber <= 7
	if (!onTopRow) {
		if(board[currentSquareNumber + 8] != "red" && board[currentSquareNumber + 8] != "gold"){
		return true}
	}
	// Is a move downwards possible?
	var onBottomRow = (currentSquare >= 56 && currentSquare <= 63)
	if (!onBottomRow){
		if(board[currentSquareNumber - 8] != "red" && board[currentSquareNumber - 8] != "gold"){
		return true}
	}
	return false;
	} 

function playerEliminated(){ } //TBC

function newGameClicked(){ }//TBC


function findFreeSquare(){
	var squareFound = false
	var attempt = 	Math.floor(Math.random() * 63)
	while (!squareFound){
		if(board[squareFound] == "empty"){
			return attempt;
		}
		attempt = 	Math.floor(Math.random() * 63)
	}
}

function addActionListeners() {
	document.getElementById("UP").addEventListener("click", setHumanDirection("UP"))
	document.getElementById("DOWN").addEventListener("click", setHumanDirection("DOWN"))
	document.getElementById("LEFT").addEventListener("click", setHumanDirection("LEFT"))
	document.getElementById("RIGHT").addEventListener("click", setHumanDirection("RIGHT"))
	document.getElementById("RESTART").addEventListener("click", function() {location.reload})
}