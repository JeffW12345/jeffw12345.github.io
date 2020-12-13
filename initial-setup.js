// Initial board setup.

createInitialBoard();

function createInitialBoard(){
	// In the array below, the first entry represents the square at the top left row, then next one the next square, etc.
	// Green = contains a green circle, etc. 
	var square, board = ["green","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty",
	"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", 
	"empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty","empty", "empty",
	"empty","empty","empty","empty","empty","empty","empty","red","empty","empty","empty","empty","empty","empty","red"];
	for(square in board){
		if (board[square] == "empty"){document.write('<div class = "square"></div>');}
		if (board[square] == "red"){document.write('<div class = "square"><div class = "red-circle"></div></div>');}
		if (board[square] == "gold"){document.write('<div class = "square"><div class = "gold-circle"></div></div>');}
		if (board[square] == "green"){document.write('<div class = "square"><div class = "green-circle"></div></div>');}
	}
}