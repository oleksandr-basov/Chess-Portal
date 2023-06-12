const chessPieces = {
    'r': './images/black_rook.png',
    'n': './images/black_knight.png',
    'b': './images/black_bishop.png',
    'q': './images/black_queen.png',
    'k': './images/black_king.png',
    'p': './images/black_pawn.png',
    'R': './images/white_rook.png',
    'N': './images/white_knight.png',
    'B': './images/white_bishop.png',
    'Q': './images/white_queen.png',
    'K': './images/white_king.png',
    'P': './images/white_pawn.png',
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
            cell.className = `cell ${((i % 2) ^ (j % 2)) ? 'light' : 'dark'}`;
            cell.id = `cell-${i}-${j}`;

            let piece = document.createElement('div');
            piece.className = 'piece';
            cell.appendChild(piece);

            chessBoard.appendChild(cell);

            // Bind the 'click' event to the cell
            cell.addEventListener('click', handleCellClick);
        }
    }
}

const handleCellClick = (event) => {
    // Check if a piece is already selected
    if (window.selectedPiece) {
        // Retrieve the destination cell and the selected piece info
        const destinationCell = event.currentTarget;
        const { piece, fromCell } = window.selectedPiece;

        // If the destination cell is not empty, do nothing
        if (destinationCell.querySelector('.piece').style.backgroundImage.includes('url')) {
            return;
        }

        // Move the piece from the old cell to the new cell
        fromCell.querySelector('.piece').style.backgroundImage = '';
        destinationCell.querySelector('.piece').style.backgroundImage = piece;
        destinationCell.querySelector('.piece').style.backgroundSize = 'contain';  // Move the piece style

        // Remove the 'selected' class from the old cell
        fromCell.classList.remove('selected');

        // Reset window.selectedPiece
        window.selectedPiece = null;
    } else {
        // Select a cell
        const selectedCell = event.currentTarget;
        const selectedPiece = selectedCell.querySelector('.piece').style.backgroundImage;

        // Check if a piece is selected
        if (selectedPiece.includes('url')) {
            // Add 'selected' class to highlight the cell
            selectedCell.classList.add('selected');

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
            let pieceCode = chessState[i][j];
            if (pieceCode !== ' ') {
                let piece = document.querySelector(`#cell-${i}-${j} .piece`);
                piece.style.backgroundImage = `url(${chessPieces[pieceCode]})`;
                piece.style.backgroundSize = 'contain';  // Fit image within cell
                piece.style.backgroundRepeat = 'no-repeat';
            }
        }
    }
}

createChessBoard();
renderChessPieces(initialChessState);
