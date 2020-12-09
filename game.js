//This file awaits for an instruction to begin the game, and then runs the game.


awaitNewGameInstruction(){
	document.getElementById("NEW-GAME").addEventListener("mousedown",startGame());
}

startGame(){
	createBoard();
	var gameInProgress = true;
	var lastTimeRecorded = new Date.now();
	while gameInProgress == true{
		currentTime = new Date.now()
		if(currentTime <  lastTimeRecorded + 500) {continue;}  // Has half a second passed since the last loop?
	};//TBC
}

function playerEliminated(){;} //TBC

function newGameClicked(){;}//TBC

function newRedCircleObject(){;}