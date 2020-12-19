// In the array below, the first entry represents the square at the top left row, then next one the next square, etc.
// Green = contains a green circle, etc. 

var square, board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty", "empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","gold"];

var gameInProgress = false;
var humanDirection = 4; // 0 = up, 1 = down, 2 = left, 3 = right, 4 = no move

function createInitialBoard(){
	for(square in board){
		if (board[square] == "empty"){document.write('<div class = "square"></div>');}
		if (board[square] == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>');}
		if (board[square] == "gold"){document.write('<div class = "square"><div class = "gold-circle"></div></div>');}
		if (board[square] == "green"){document.write('<div class = "square"><div class = "green-circle"></div></div>');}
	}
}

function startGame(){
	gameInProgress = true
	document.getElementById("NEW-GAME").addEventListener("mousedown",newGameClicked())
	var scoreMsg = document.getElementById("score").textContent
	scoreMsg = "hello - test"
	createInitialBoard()
	gameInProgress = true
	humanDirection = 4  
	var circleObjects = [] // To store human player, computer player and gold circle objects. 
	circleObjects[0] = {type: 'green', square: 0, direction: 4}  //Human player
	circleObjects[1] = {type: 'gold', square: 63, direction: 4} // Gold square 
	circleObjects[2] = {type: 'red', square: 56, direction: 4} // Red square - computer opponent
	var numberOfComputerOppoments = 1
	var score = 0
	var lastTimeRecorded = Date.now() + 500
	while (gameInProgress){

		scoreMsg = score
		addDirectionEventListeners()
		// Message if human selects invalid move
		if (!isHumanMoveValid){document.getElementById("message1").textContent = "Invalid move"}
		else {document.getElementById("message1").textContent = ""}
		// Has half a second passed since the last complete loop?
		if(Date.now() <  lastTimeRecorded + 500) {continue}
		// Human and computer player moves processed
		if (isHumanMoveValid){humanPlayerMove()}
		computerPlayerMoves()
		updateBoard()
		// If player has landed on a square containing a gold circle. - TBC
		
		// If the human player has collided with a computer player. - TBC
		
		lastTimeRecorded = new Date.now()
		var humanDirection = 4 // Resetting post-move
	}
	// TBC
}

function updateBoard(){} //TBC

function isHumanMoveValid(){} //TBC

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
		spriteObject.direction = getDirection(spriteObject);
	}
}

// Returns an int. 0 = up, 1 = down, 2 = left, 3 = right, 4 = no valid move
function getDirection(spriteObject){
	if (!doesValidMoveExist(spriteObject)){return 4}
	var randomDirection = Math.floor(Math.random() * 3);  
	if (isNotValidMove(spriteObject)){getDirection(spriteObject)}
	return randomDirection
}

function doesValidMoveExist(spriteObject){} //TBC

function playerEliminated(){;} //TBC

function newGameClicked(){;}//TBC

function newComputerPlayer(initialSquare){
	this.square = initialSquare;}


function newGoldCircleObject(squareNum){
	} //TBC

function isSquareFree(squareNum){
	//Checks if a square is free for a new object to occupy. TBC
}

function setSquare(squareNumber, spriteObject) {;} //Sets a new square for the 'this' object. 

function removePreviousGameMessages() {;} //TBC

function findFreeSquare(){} //TBC
