//This file awaits for an instruction to begin the game, and then runs the game.

awaitNewGameInstruction()

awaitNewGameInstruction(){
	removePreviousGameMessages();
	document.getElementById("NEW-GAME").addEventListener("mousedown",startGame());}
}

startGame(){
	document.getElementById("NEW-GAME").addEventListener("mousedown",newGameClicked());}
	createInitialBoard();
	var gameInProgress = true;
	var lastTimeRecorded = new Date.now();
	var circleObjects[]; // To store human player, computer player and gold circle objects. 
	circleObjects[0] = newHumanPlayerObject();
	circleObjects[1] = newGoldCircleObject(findFreeSquare());
	var score = 0;
	var numberOfComputerOppoments = 2;
	while gameInProgress == true{
		currentTime = new Date.now()
		if(currentTime <  lastTimeRecorded + 500) {continue;}  // Has half a second passed since the last loop?
	};//TBC
}

function playerEliminated(){;} //TBC

function newGameClicked(){;}//TBC

function newComputerPlayer(initialSquare){
	this.square = initialSquare;}

function newHumanPlayer(){
	this.square = 1;}

function newGoldCircleObject(squareNum){
	this.square = squareNum;} //TBC

function isSquareFree(circleObjects[]){
	//Checks if a square is free for a new object to occupy. TBC
}

function setSquare() {;} //Sets a new square for the 'this' object. 

function removePreviousGameMessages() {;} //TBC

//Returns the number of a random square not currently occupied. 
function findFreeSquare(){}

