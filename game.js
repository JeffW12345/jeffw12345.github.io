// In the 'board' array below, the first entry represents the square at the top left row, then next one the next square to the left, etc.
// Green = contains a green circle, etc. 
var board = [
	"green","empty","empty","empty","empty","empty","empty","empty",
	"empty","empty","empty","empty","empty","empty","empty","empty",
	"empty","empty","empty","empty","empty","empty","empty","empty",
	"empty","empty","empty","empty","empty","empty","empty","empty",
	"empty", "empty","empty","empty","empty","empty","empty","empty",
	"empty","empty","empty","empty","empty","empty","empty","empty", 
	"empty", "empty","empty","empty","empty","empty","empty","empty",
	"red","empty","empty","empty","empty","empty","empty","orange"
] 

var gameInProgress = false 
var humanDirection = "NO MOVEMENT"
var circleObjects = [] // To store human player, computer player and orange circle (prize) objects.
circleObjects[0] = {colour: 'green', squareNum: 0} // Human player
circleObjects[1] = {colour: 'orange', squareNum: 63} // Gold square (human wins points on reaching this square)
circleObjects[2] = {colour: 'red', squareNum: 56} // Red square - computer player (human's opponent)
var millisecondsElapsed = 0
var score = 0
var numberOfComputerOpponents = 1
var intervalSetter

function createInitialBoard(){
	for(square of board){
		if (square == "empty"){document.write('<div class = "square"></div>')}
		if (square == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>')}
		if (square == "orange"){document.write('<div class = "square"><div class = "orange-circle"></div></div>')}
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
		if (square == "orange") {
			boardDivs[count].innerHTML = '<div class = "orange-circle"></div>'}
		if (square == "green") {
			boardDivs[count].innerHTML = '<div class = "green-circle"></div>'}
		if (square == "black") {
			boardDivs[count].innerHTML = '<div class = "black-circle"></div>'}
		count++
	}
}
 
function startGame(userChoice){
	if (userChoice == "RELOAD") {
		location.reload()
	}
	humanDirection = userChoice
	gameInProgress = true  
	clearInterval(intervalSetter)  // Removes an interval setter if one in place, to prevent multiple threads. 
	activateIntervalSetter()} // Interval setter to make inGameActions() run every 240 milliseconds. 

function activateIntervalSetter(){
	intervalSetter = setInterval(function(){inGameActions()},240)
}

function inGameActions(){
		moveGreenCircle(humanDirection)
		makeComputerMove()
		updateBoardRepresentation()
		// If human lands on orange square, award points and put orange circle on new square
		if(circleObjects[0].squareNum == circleObjects[1].squareNum){
			score += 10
			circleObjects[1].squareNum = findFreeSquare()
		}
		document.getElementById("score").textContent = "Score: " + score //Posts score
		// If the human player has collided with a computer player.
		if(isHumanEliminated()) {
			document.getElementById("end-of-game-message").textContent = "You've been eliminated. Press 'RESTART' to play again."
			document.getElementById("UP").disabled = true
			document.getElementById("DOWN").disabled = true
			document.getElementById("LEFT").disabled = true
			document.getElementById("RIGHT").disabled = true
			gameInProgress = false
		}
		updateBoardRepresentation()
		// New computer opponent added approximately every 30 seconds till there are 4 computer opponents.
		if (millisecondsElapsed % 30000 == 0 && numberOfComputerOpponents < 4 && gameInProgress && millisecondsElapsed > 0){
			squareForNewPlayer = findFreeSquare()
			newComputerPlayer(squareForNewPlayer)
			numberOfComputerOpponents++
			updateBoardRepresentation()}
		updateBoardView() // Re-populates the board
		humanDirection = "NO MOVEMENT" // Resetting human movement to stationary post-move
		millisecondsElapsed += 240
		// Stops the function from running every 200 milliseconds if the player has been eliminated
		if(!gameInProgress){
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
	var orangeCircleNum = circleObjects[1].squareNum
	var redPlayerSquareNums =  getRedPlayerSquareNums()
	var allOccupiedSquares = getAllOccupiedSquares()
	var i
	for (i = 0; i < 64; i++){
		if(i == humanSquareNum){
			board[i] = "green"
		}
		if(i == orangeCircleNum){
			board[i] = "orange"
		}
		if(redPlayerSquareNums.includes(i)){
			board[i] = "red"
		}
		if(!allOccupiedSquares.includes(i)){
			board[i] = "empty"
		}
		// Square turns black if human player eliminated. 
		if(!gameInProgress && i == humanSquareNum){
			board[i] = "black"
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

// The human can exit one side of the board and re-emerge on the other side. 
function moveGreenCircle(directionOfTravel) {
		var currentSquare = circleObjects[0].squareNum
		// Clicks 'up' and on top row
		if(directionOfTravel == "UP" && currentSquare > 7){
			circleObjects[0].squareNum -= 8
		}
		// Clicks 'up' and not on top row
		if(directionOfTravel == "UP" && currentSquare <= 7){
			circleObjects[0].squareNum += 56
		}
		// Clicks 'down' and on bottom row
		if(directionOfTravel == "DOWN" && currentSquare >= 56){
			circleObjects[0].squareNum -= 56
		}
		// Clicks 'down' and not on bottom row
		if(directionOfTravel == "DOWN" && currentSquare < 56){
			circleObjects[0].squareNum += 8
		}
		// Clicks 'left' and on leftmost row
		var leftNums = [0, 8, 16, 24, 32, 40, 48, 56]
		if(directionOfTravel == "LEFT" && leftNums.includes(currentSquare)){
			circleObjects[0].squareNum += 7
		}
		// Clicks 'left' and not on leftmost row
		if(directionOfTravel == "LEFT" && (!leftNums.includes(currentSquare))){
			circleObjects[0].squareNum -= 1
			}
		// Clicks 'right' and on rightmost row
		var rightNums = [7, 15, 23, 31, 39, 47, 55, 63]
		if(directionOfTravel == "RIGHT" && (rightNums.includes(currentSquare))){
			circleObjects[0].squareNum -= 7
		}
		// Clicks 'right' and not on rightmost row
		if(directionOfTravel == "RIGHT" && (!rightNums.includes(currentSquare))){
			circleObjects[0].squareNum += 1
		}
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
	// Checks if there is a orange or red circle on the proposed destination square 
	// (as it can't occupy their squares).
	// Check for 'up' first. 
	var redPlayerNums = getRedPlayerSquareNums()
	var orangeCircleNum = circleObjects[1].squareNum
	if (directionAsInt == 0 &&  redPlayerNums.includes(currentSquareNumber - 8)) {
		return false
	}	
	if (directionAsInt == 0 && orangeCircleNum == (currentSquareNumber - 8)) {
		return false
	}
	// Down
	if (directionAsInt == 1 &&  redPlayerNums.includes(currentSquareNumber + 8)) {
		return false
	}	
	if (directionAsInt == 1 && orangeCircleNum == (currentSquareNumber + 8)) {
		return false
	}	
	// Left
	if (directionAsInt == 2 &&  redPlayerNums.includes(currentSquareNumber - 1)) {
		return false
	}	
	if (directionAsInt == 2 && orangeCircleNum == (currentSquareNumber - 1)) {
		return false
	}
	// Right
	if (directionAsInt == 3 &&  redPlayerNums.includes(currentSquareNumber + 1)) {
		return false
	}	
	if (directionAsInt == 3 && orangeCircleNum == (currentSquareNumber + 1)) {
		return false
	}
	return true
}

// Red player cannot occupy same square as another red player or as a orange circle
function doesValidMoveExist(redPlayer){
	currentSquareNumber = redPlayer.squareNum
	// Is a move to the left possible?
	var farLeftColSquareNums = [0, 8, 16, 24, 32, 40, 48, 56]
	var onFarLeftCol = farLeftColSquareNums.includes(currentSquareNumber)
	if (!onFarLeftCol){
		if(board[currentSquareNumber - 1] != "red" && board[currentSquareNumber - 1] != "orange"){
		return true}
	}
	// Is a move to the right possible?
	var farRightColSquareNums = [7, 15, 23, 31, 39, 47, 55, 63]
	var onFarRightCol = farRightColSquareNums.includes(currentSquareNumber)
	if (!onFarRightCol) {
		if(board[currentSquareNumber + 1] != "red" && board[currentSquareNumber + 1] != "orange"){
		return true}
			}
	// Is a move upwards possible?
	var onTopRow = currentSquareNumber <= 7
	if (!onTopRow) {
		if(board[currentSquareNumber + 8] != "red" && board[currentSquareNumber + 8] != "orange"){
		return true}
		}
	// Is a move downwards possible?
	var onBottomRow = (currentSquareNumber >= 56 && currentSquareNumber <= 63)
	if (!onBottomRow){
		if(board[currentSquareNumber - 8] != "red" && board[currentSquareNumber - 8] != "orange"){
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

function setHumanDirection(direction){
	humanDirection = direction
}
	

function newComputerPlayer(squareToGoOn){
	newObject = {colour: 'red', squareNum: squareToGoOn}
	circleObjects.push(newObject)
}
