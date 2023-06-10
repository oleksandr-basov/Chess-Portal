// Constants for the chess pieces, represented as strings.
const chessPieces = {
    'r': '♜', // Black Rook
    'n': '♞', // Black Knight
    'b': '♝', // Black Bishop
    'q': '♛', // Black Queen
    'k': '♚', // Black King
    'p': '♟︎', // Black Pawn
    'R': '♖', // White Rook
    'N': '♘', // White Knight
    'B': '♗', // White Bishop
    'Q': '♕', // White Queen
    'K': '♔', // White King
    'P': '♙'  // White Pawn
};

const initialChessState = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

function createChessBoard() {
    let chessBoard = document.createElement('div');
    chessBoard.id = 'chess-board';
    document.body.appendChild(chessBoard);

    // Create chessboard grid.
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}-${j}`;
            if ((i + j) % 2 === 0) {
                cell.className += ' white';
            } else {
                cell.className += ' black';
            }
            chessBoard.appendChild(cell);
        }
    }
}

createChessBoard();
