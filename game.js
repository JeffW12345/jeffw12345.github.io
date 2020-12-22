
// In the 'board' array below, the first entry represents the square at the top left row, then next one the next square to the left, etc.
// Green = contains a green circle, etc. 
var board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty", "empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","gold"] 
var gameInProgress = false 
var humanDirection = "NO MOVEMENT"
var circleObjects = [] // To store human player, computer player and gold circle (prize) objects.
circleObjects[0] = {colour: 'green', squareNum: 0} // Human player
circleObjects[1] = {colour: 'gold', squareNum: 63} // Gold square (human wins points on reaching this square)
circleObjects[2] = {colour: 'red', squareNum: 56} // Red square - computer player (human's opponent)
var millisecondsElapsed = 0
var score = 0
var numberOfComputerOpponents = 1
var intervalSetter

function createInitialBoard(){
	for(square of board){
		if (square == "empty"){document.write('<div class = "square"></div>')}
		if (square == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>')}
		if (square == "gold"){document.write('<div class = "square"><div class = "gold-circle"></div></div>')}
		if (square == "green"){document.write('<div class = "square"><div class = "green-circle"></div></div>')}
	}
}

// Used to re-populate the board after pieces have moved. 
function updateBoardView(){
	var boardDivs = document.getElementsByClassName("square")
	var count = 0
	for(square of board){
		if (square == "empty") {
			boardDivs[count].innerHTML = ''}
		if (square == "red") {
			boardDivs[count].innerHTML = '<div class = "red-circle"></div>'}
		if (square == "gold") {
			boardDivs[count].innerHTML = '<div class = "gold-circle"></div>'}
		if (square == "green") {
			boardDivs[count].innerHTML = '<div class = "green-circle"></div>'}
		count++
	}
}

// This function is only called when the human player attempts an initial move. 
function startGame(userChoice){
	console.log(userChoice)
	// Actions if proposed move is valid
	if(isHumanMoveValid(userChoice) && !gameInProgress) {
		humanDirection = userChoice
		gameInProgress = true  
		// Removes 'invalid move' message that might be present
		document.getElementById("message1").textContent = " " 
		// The inGameActions() function runs immediately, and then every 500 milliseconds thereafter. 
		intervalSetter = setInterval(function(){inGameActions()},500)}
	// Message if human player selects invalid move
	if (!isHumanMoveValid(userChoice)){
		document.getElementById("message1").textContent = "Invalid move"}
		}

function inGameActions(){
		moveGreenCircle(humanDirection)
		console.log(humanDirection)
		makeComputerMove()
		updateBoardRepresentation()
		// If human lands on gold square, award points and put gold circle on new square
		if(circleObjects[0].squareNum == circleObjects[1].squareNum){
			score += 10
			circleObjects[1].squareNum = findFreeSquare()
		}
		document.getElementById("score").textContent = "Score: " + score //Posts score
		// If the human player has collided with a computer player.
		if(isHumanEliminated()) {
			document.getElementById("end-of-game-message").textContent = "You've been eliminated. Press 'RESTART' to play again."
			gameInProgress = false
		}
		updateBoardRepresentation()
		// New computer opponent added approximately every 20 seconds till there are 4 computer opponents.
		if (millisecondsElapsed % 30000 == 0 && numberOfComputerOpponents < 4 && gameInProgress && millisecondsElapsed > 0){
			squareForNewPlayer = findFreeSquare()
			newComputerPlayer(squareForNewPlayer)
			numberOfComputerOpponents++
			updateBoardRepresentation()}
		updateBoardView() // Re-populates the board
		humanDirection = "NO MOVEMENT" // Resetting human movement to stationary post-move
		millisecondsElapsed += 500
		// Stops the function from running every 500 milliseconds if the player has been eliminated
		if(!gameInProgress){
			console.log("Game over")
			clearInterval(intervalSetter)
		}
	}

function isHumanEliminated(){
	var redPlayerSquares = getRedPlayerSquareNums()
	if (redPlayerSquares.includes(circleObjects[0].squareNum)) 
		{return true}
	return false}

function updateBoardRepresentation(){
	var humanSquareNum = circleObjects[0].squareNum
	var goldCircleNum = circleObjects[1].squareNum
	var redPlayerSquareNums =  getRedPlayerSquareNums()
	var allOccupiedSquares = getAllOccupiedSquares()
	var i
	for (i = 0; i < 64; i++){
		if(i == humanSquareNum){
			board[i] = "green"
		}
		if(i == goldCircleNum){
			board[i] = "gold"
		}
		if(redPlayerSquareNums.includes(i)){
			board[i] = "red"
		}
		if(!allOccupiedSquares.includes(i)){
			board[i] = "empty"
		}
	}
}

function getAllOccupiedSquares(){
	var occupiedSquareNums= []
	for (obj of circleObjects){
		occupiedSquareNums.push(obj.squareNum)
	}
	return occupiedSquareNums
}

function getRedPlayerSquareNums(){
	var redCircleNums = []
	for (obj of circleObjects){
		if (obj.colour == 'red') {
			redCircleNums.push(obj.squareNum)
		}
	}
	return redCircleNums
}

function moveGreenCircle(directionOfTravel) {
		if(directionOfTravel == "UP"){
			circleObjects[0].squareNum -= 8
		}
		if(directionOfTravel == "DOWN"){
			circleObjects[0].squareNum += 8
		}
		if(directionOfTravel == "LEFT"){
			circleObjects[0].squareNum -= 1
		}
		if(directionOfTravel == "RIGHT"){
			circleObjects[0].squareNum += 1
		}
}

function isHumanMoveValid(directionOfMovement){
	var currentSquareNumber = circleObjects[0].squareNum
	// Checks situations where the move would be out of bounds
	var onTopRow = currentSquareNumber <= 7
	if (onTopRow && directionOfMovement == "UP")
		{return false}
	var farLeftColSquareNums = [0, 8, 16, 24, 32, 40, 48, 56]
	var onFarLeftCol = farLeftColSquareNums.includes(currentSquareNumber)
	if (onFarLeftCol && directionOfMovement == "LEFT") 
		{return false}
	var farRightColSquareNums = [7, 15, 23, 31, 39, 47, 55, 63]
	var onFarRightCol = farRightColSquareNums.includes(currentSquareNumber)
	if (onFarRightCol && directionOfMovement == "RIGHT")
		{return false}
	var onBottomRow = (currentSquareNumber >= 56 && currentSquareNumber <= 63)
	if (onBottomRow && directionOfMovement == "DOWN")
		{return false}
	return true
	} 

function makeComputerMove(){
	for (spriteObject of circleObjects){
		if (spriteObject.colour != 'red') {continue}
		var directionOfTravel = getDirection(spriteObject)
		setNewSquare(spriteObject, directionOfTravel)
		updateBoardRepresentation()
	}
}
 
function setNewSquare(spriteObject, directionOfTravel){
	var existingSquare = spriteObject.squareNum
	//console.log("Existing square " + existingSquare)
	var newSquare  = 0
	if (directionOfTravel == "NO MOVEMENT") {newSquare = existingSquare}
	if (directionOfTravel == "UP") {newSquare += (existingSquare - 8)}
	if (directionOfTravel == "DOWN") {newSquare += (existingSquare + 8)}
	if (directionOfTravel == "LEFT") {newSquare += (existingSquare - 1)}
	if (directionOfTravel == "RIGHT") {newSquare += (existingSquare + 1)}
	//console.log("New square " + newSquare)
	spriteObject.squareNum = newSquare
}

function getDirection(spriteObject){
	if (!doesValidMoveExist(spriteObject)){return "NO MOVEMENT"}
	// For code below, 0 = up, 1 = down, 2 = left, 3 = right
	while (true){
		var randomDirection = Math.floor(Math.random() * 4)
		if(isProposedComputerMoveValid(spriteObject, randomDirection))
			{break}
			}
	if (randomDirection == 0) return "UP"
	if (randomDirection == 1) return "DOWN"
	if (randomDirection == 2) return "LEFT"
	return "RIGHT"
}

// 0 = up, 1 = down, 2 = left, 3 = right
function isProposedComputerMoveValid(spriteObject, directionAsInt){
	var currentSquareNumber = spriteObject.squareNum
	// Checks situations where the move would be out of bounds
	// Check for 'up' first. 
	var onTopRow = currentSquareNumber <= 7
	if (onTopRow && directionAsInt == 0)
		{return false}
	// Down
	var onBottomRow = (currentSquareNumber >= 56 && currentSquareNumber <= 63)
	if (onBottomRow && directionAsInt == 1)
		{return false}
	// Left
	var farLeftColSquareNums = [0, 8, 16, 24, 32, 40, 48, 56]
	var onFarLeftCol = farLeftColSquareNums.includes(currentSquareNumber)
	if (onFarLeftCol && directionAsInt == 2)
		{return false}
	// Right
	var farRightColSquareNums = [7, 15, 23, 31, 39, 47, 55, 63]
	var onFarRightCol = farRightColSquareNums.includes(currentSquareNumber)
	if (onFarRightCol && directionAsInt == 3)
		{return false}
	// Checks if there is a gold or red circle on the proposed destination square 
	// (as it can't occupy their squares).
	// Check for 'up' first. 
	var redPlayerNums = getRedPlayerSquareNums()
	var goldCircleNum = circleObjects[1].squareNum
	if (directionAsInt == 0 &&  redPlayerNums.includes(currentSquareNumber - 8)) {
		return false
	}	
	if (directionAsInt == 0 && goldCircleNum == (currentSquareNumber - 8)) {
		return false
	}
	// Down
	if (directionAsInt == 1 &&  redPlayerNums.includes(currentSquareNumber + 8)) {
		return false
	}	
	if (directionAsInt == 1 && goldCircleNum == (currentSquareNumber + 8)) {
		return false
	}	
	// Left
	if (directionAsInt == 2 &&  redPlayerNums.includes(currentSquareNumber - 1)) {
		return false
	}	
	if (directionAsInt == 2 && goldCircleNum == (currentSquareNumber - 1)) {
		return false
	}
	// Right
	if (directionAsInt == 3 &&  redPlayerNums.includes(currentSquareNumber + 1)) {
		return false
	}	
	if (directionAsInt == 3 && goldCircleNum == (currentSquareNumber + 1)) {
		return false
	}
	return true
}

// Red player cannot occupy same square as another red player or as a gold circle
function doesValidMoveExist(redPlayer){
	currentSquareNumber = redPlayer.squareNum
	// Is a move to the left possible?
	var farLeftColSquareNums = [0, 8, 16, 24, 32, 40, 48, 56]
	var onFarLeftCol = farLeftColSquareNums.includes(currentSquareNumber)
	if (!onFarLeftCol){
		if(board[currentSquareNumber - 1] != "red" && board[currentSquareNumber - 1] != "gold"){
		return true}
	}
	// Is a move to the right possible?
	var farRightColSquareNums = [7, 15, 23, 31, 39, 47, 55, 63]
	var onFarRightCol = farRightColSquareNums.includes(currentSquareNumber)
	if (!onFarRightCol) {
		if(board[currentSquareNumber + 1] != "red" && board[currentSquareNumber + 1] != "gold"){
		return true}
			}
	// Is a move upwards possible?
	var onTopRow = currentSquareNumber <= 7
	if (!onTopRow) {
		if(board[currentSquareNumber + 8] != "red" && board[currentSquareNumber + 8] != "gold"){
		return true}
		}
	// Is a move downwards possible?
	var onBottomRow = (currentSquareNumber >= 56 && currentSquareNumber <= 63)
	if (!onBottomRow){
		if(board[currentSquareNumber - 8] != "red" && board[currentSquareNumber - 8] != "gold"){
		return true}
	}
	return false;
}

function findFreeSquare(){
	while (true){
		var attempt = Math.floor(Math.random() * 64)
		if(board[attempt] == "empty"){
			return attempt;
		}
	}
}

function newComputerPlayer(squareToGoOn){
	newObject = {colour: 'red', squareNum: squareToGoOn}
	circleObjects.push(newObject)
}
