const chessPieces = {
    'r': 'images/black_rook.png',
    'n': 'images/black_knight.png',
    'b': 'images/black_bishop.png',
    'q': 'images/black_queen.png',
    'k': 'images/black_king.png',
    'p': 'images/black_pawn.png',
    'R': 'images/white_rook.png',
    'N': 'images/white_knight.png',
    'B': 'images/white_bishop.png',
    'Q': 'images/white_queen.png',
    'K': 'images/white_king.png',
    'P': 'images/white_pawn.png',
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
        if (destinationCell.style.backgroundImage !== "") {
            return;
        }

        // Move the piece from the old cell to the new cell
        fromCell.style.backgroundImage = '';
        destinationCell.style.backgroundImage = piece;

        // Remove the 'selected' class from the old cell
        fromCell.classList.remove('selected');

        // Reset window.selectedPiece
        window.selectedPiece = null;
    } else {
        // Select a piece
        const selectedCell = event.target;
        const selectedPiece = selectedCell.style.backgroundImage;

        // Check if a piece is selected
        if (selectedPiece !== "") {
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
                cell.style.backgroundImage = `url(${chessPieces[piece]})`;
                cell.style.backgroundSize = 'contain';  // Fit image within cell
            }
        }
    }
}

createChessBoard();
renderChessPieces(initialChessState);
