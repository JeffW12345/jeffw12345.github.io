//This file awaits for an instruction to begin the game, and then runs the game.

awaitNewGameInstruction()

function awaitNewGameInstruction(){
	removePreviousGameMessages();
	//TO DO - Code for writing score. 
	document.getElementById("NEW-GAME").addEventListener("mousedown",startGame());}

function startGame(){
	document.getElementById("NEW-GAME").addEventListener("mousedown",newGameClicked());
	createInitialBoard();
	var gameInProgress = true;
	var lastTimeRecorded = new Date.now();
	var circleObjects = []; // To store human player, computer player and gold circle objects. 
	circleObjects[0] = {type: 'green', square: 0};  //Human player
	circleObjects[1] = {type: 'gold', square: findFreeSquare()}; // Gold square 
	circleObjects[2] = {type: 'red', square: 63}; // Red square - target for human
	circleObjects[3] = {type: 'red', square: 56}; // Red square - computer opponent
	var numberOfComputerOppoments = 2;
	var score = 0;
	while (gameInProgress){
		currentTime = new Date.now()
		if(currentTime <  lastTimeRecorded + 500) {continue;}  // Has half a second passed since the last loop?
	}
	//TBC
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

