//This file awaits for an instruction to begin the game, and then runs the game.


awaitNewGameInstruction(){
	document.getElementById("NEW-GAME").addEventListener("mousedown",startGame());
}

startGame(){
	createBoard();
	var gameInProgress = true;
	var lastTimeRecorded = new Date.now();
	var circleObjects[]; // To store human player, computer player and gold circle objects. 
	circleObjects[0] = newHumanPlayerObject();
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

function newGoldCircleObject(initialSquare){
	this.square = initialSquare;} //TBC

function isSquareFree(circleObjects[]){
	//Checks if a square is free for a new object to occupy. TBC
}

function setSquare() (;) //TBC

