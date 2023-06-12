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

    // Bind the 'click' event to all cells
    chessBoard.querySelectorAll('.cell').forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
    });
}

const handleCellClick = (event) => {
    // Check if a piece is already selected
    if (window.selectedPiece) {
        // Retrieve the destination cell and the selected piece info
        const destinationCell = event.target;
        const { piece, fromCell } = window.selectedPiece;

        // If the destination cell is not empty, do nothing
        if (destinationCell.textContent.trim().length > 0) {
            return;
        }

        // Move the piece from the old cell to the new cell
        fromCell.textContent = '';
        destinationCell.textContent = piece;

        // Remove the 'selected' class from the old cell
        fromCell.classList.remove('selected');

        // Reset window.selectedPiece
        window.selectedPiece = null;
    } else {
        // Select a piece
        const selectedCell = event.target;
        const selectedPiece = selectedCell.textContent;

        // Check if a piece is selected
        if (selectedPiece.trim().length > 0) {
            // Add 'selected' class to highlight the cell
            selectedCell.classList.add('selected');

            // Save
            // Save the selected piece and cell for later use
            window.selectedPiece = {
                piece: selectedPiece,
                fromCell: selectedCell
            };
        }
    }
};

function renderChessPieces(chessState) {
    for (let i = 0; i < chessState.length; i++) {
        for (let j = 0; j < chessState[i].length; j++) {
            let piece = chessState[i][j];
            if (piece !== ' ') {
                let cell = document.getElementById(`cell-${i}-${j}`);
                let textNode = document.createTextNode(chessPieces[piece]);
                cell.appendChild(textNode);
            }
        }
    }
}

createChessBoard();
renderChessPieces(initialChessState);
