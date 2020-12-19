// In the array below, the first entry represents the square at the top left row, then next one the next square, etc.
// Green = contains a green circle, etc. 

var square, board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
"empty", "empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","gold"];

function createInitialBoard(){
	for(square in board){
		if (board[square] == "empty"){document.write('<div class = "square"></div>');}
		if (board[square] == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>');}
		if (board[square] == "gold"){document.write('<div class = "square"><div class = "gold-circle"></div></div>');}
		if (board[square] == "green"){document.write('<div class = "square"><div class = "green-circle"></div></div>');}
	}
}

function startGame(){
	var gameInProgress = true;
	document.getElementById("score").textContent = "hello"
	document.getElementById("NEW-GAME").addEventListener("mousedown",newGameClicked());
	createInitialBoard();
	gameInProgress = true;
	var humanDirection = 4  // 0 = up, 1 = down, 2 = left, 3 = right, 4 = no move
	var circleObjects = []; // To store human player, computer player and gold circle objects. 
	circleObjects[0] = {type: 'green', square: 0, direction: 4};  //Human player
	circleObjects[1] = {type: 'gold', square: 63, direction: 4}; // Gold square 
	circleObjects[2] = {type: 'red', square: 56, direction: 4}; // Red square - computer opponent
	var numberOfComputerOppoments = 1;
	var score = 0;
	var lastTimeRecorded = Date.now() + 500;
	document.getElementById("score").innerHTML = "test"
	while (gameInProgress){
		console.log(score)
		document.getElementById("score").textContent = score.toString
		addDirectionEventListeners();
		// Message if human selects invalid move
		if (!isHumanMoveValid){document.getElementById("message1").textContent = "Invalid move"}
		else {document.getElementById("message1").textContent = ""}
		// Has half a second passed since the last complete loop?
		if(Date.now() <  lastTimeRecorded + 500) {continue;}
		// Human and computer player moves processed
		if (isHumanMoveValid){humanPlayerMove()}
		computerPlayerMoves();
		updateBoard();
		// If player has landed on a square containing a gold circle. - TBC
		
		// If the human player has collided with a computer player. - TBC
		
		lastTimeRecorded = new Date.now()
		var humanDirection = 4 // Resetting post-move
	}
	// TBC
}

function updateBoard(){} //TBC

function isHumanMoveValid(){} //TBC

function addDirectionEventListeners(){
	document.getElementById("UP").addEventListener("mousedown",humanDirection = 0)
	document.getElementById("DOWN").addEventListener("mousedown",humanDirection = 1)
	document.getElementById("LEFT").addEventListener("mousedown",humanDirection = 2)
	document.getElementById("RIGHT").addEventListener("mousedown",humanDirection = 3)
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

