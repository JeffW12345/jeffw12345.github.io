// This file awaits for an instruction to begin the game, and then runs the game.

awaitNewGameInstruction()

function awaitNewGameInstruction(){
	removePreviousGameMessages();
	// TO DO - Code for writing score. 
	document.getElementById("NEW-GAME").addEventListener("mousedown",startGame());}

function startGame(){
	document.getElementById("NEW-GAME").addEventListener("mousedown",newGameClicked());
	createInitialBoard();
	var humanDirection = 4  // 0 = up, 1 = down, 2 = left, 3 = right, 4 = no move
	var gameInProgress = true;
	var circleObjects = []; // To store human player, computer player and gold circle objects. 
	circleObjects[0] = {type: 'green', square: 0, direction: 4};  //Human player
	circleObjects[1] = {type: 'gold', square: 63, direction: 4}; // Gold square 
	circleObjects[2] = {type: 'red', square: 56, direction: 4}; // Red square - computer opponent
	var numberOfComputerOppoments = 1;
	var score = 0;
	var lastTimeRecorded = new Date.now() + 500;
	while (gameInProgress){
		document.getElementById("score").textContent = score
		addDirectionEventListeners();
		// Message if human selects invalid move
		if (!isHumanMoveValid){document.getElementById("message1").textContent = "Invalid move"}
		else {document.getElementById("message1").textContent = ""}
		// Has half a second passed since the last complete loop?
		if(new Date.now() <  lastTimeRecorded + 500) {continue;}
		// Human and computer player moves processed
		if (isHumanMoveValid){humanPlayerMove()}
		computerPlayerMoves();
		updateBoard();
		// If player has landed on a square containing a gold circle.
		
		// If the human player has collided with a computer player.
		
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
		var spriteObject.direction = getDirection(spriteObject);
	}
}

// Returns an int. 0 = up, 1 = down, 2 = left, 3 = right, 4 = no valid move
function getDirection(spriteObject){
	if (!doesValidMoveExist(spriteObject)){return 4}
	var randomDirection = Math.floor(Math.random() * 3);  
	if (isNotValidMove(spriteObject){getDirection(spriteObject)}
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

