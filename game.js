//This file awaits for an instruction to begin the game, and then runs the game.


awaitNewGameInstruction(){
	document.getElementById("NEW-GAME").addEventListener("mousedown",startGame());
}

startGame(){
	createBoard();
	var gameInProgress = true;
	var timeAtStart = new Date.now();
	while gameInProgress == true{};//TBC
}

playerEliminated(){} //TBC

newGameClicked(); //TBC