// Initial board setup.

createBoard();

function createBoard(){
	// In the array below, the first entry represents the square at the top left row, then next one the next square, etc.
	// Green = contains a green circle. 
	var board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
	"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", 
	"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
	"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","red"];
	board.forEach(loopThroughBoard);}

function loopThroughBoard(item) {
  if (item == "empty"){document.write('<div class = "square"></div>');}
  if (item == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>');}
  if (item == "gold"){document.write('<div class = "square"><div class = "gold-circle"></div></div>');}
  if (item == "green"){document.write('<div class = "square"><div class = "green-circle"></div></div>');}
}