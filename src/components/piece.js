// piece.js
import chessService from '../services/chessService.js';

const handleCellClick = (event) => {
    // Check if a piece is already selected
    if (window.selectedPiece) {
        // Retrieve the destination cell and the selected piece info
        const destinationCell = event.currentTarget;
        const { piece, fromCell, pieceType, pieceColor } = window.selectedPiece;

        // If the destination cell is not empty, do nothing
        if (destinationCell.querySelector('.piece').style.backgroundImage.includes('url')) {
            return;
        }

        // Check if the move is legal
        if (!chessService.isLegalMove(fromCell, destinationCell, pieceType, pieceColor)) {
            console.log('Illegal move');
            return;
        }

        // Move the piece from the old cell to the new cell
        fromCell.querySelector('.piece').style.backgroundImage = '';
        destinationCell.querySelector('.piece').style.backgroundImage = piece;
        destinationCell.querySelector('.piece').style.backgroundSize = 'contain';  // Move the piece style

        // Remove the 'selected' class from the old cell
        fromCell.classList.remove('selected');

        // Remove 'possibleMove' class from all cells
        document.querySelectorAll('.cell.possibleMove').forEach(cell => cell.classList.remove('possibleMove'));

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

            // Determine the piece type and color
            const pieceType = selectedPiece.includes('pawn') ? 'pawn' : 'unknown';
            const pieceColor = selectedPiece.includes('white') ? 'white' : 'black';

            // Save the selected piece, cell, type and color for later use
            window.selectedPiece = {
                piece: selectedPiece,
                fromCell: selectedCell,
                pieceType: pieceType,
                pieceColor: pieceColor
            };

            // Highlight possible moves
            highlightPossibleMoves(selectedCell);
        }
    }
};

function highlightPossibleMoves(fromCell) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const toCell = document.querySelector(`#cell-${i}-${j}`);
            const selectedPiece = fromCell.querySelector('.piece').style.backgroundImage;
            const pieceType = selectedPiece.includes('pawn') ? 'pawn' : 'unknown';
            const pieceColor = selectedPiece.includes('white') ? 'white' : 'black';
            if (chessService.isLegalMove(fromCell, toCell, pieceType, pieceColor)) {
                toCell.classList.add('possibleMove');
            }
        }
    }
}

function renderChessPieces(chessState) {
    for (let i = 0; i < chessState.length; i++) {
        for (let j = 0; j < chessState[i].length; j++) {
            let pieceCode = chessState[i][j];
            if (pieceCode !== ' ') {
                let piece = document.querySelector(`#cell-${i}-${j} .piece`);
                piece.style.backgroundImage = `url(${chessService.chessPieces[pieceCode]})`;
                piece.style.backgroundSize = 'contain';  // Fit image within cell
                piece.style.backgroundRepeat = 'no-repeat';
            }
        }
    }
}

export default {
    handleCellClick,
    highlightPossibleMoves,
    renderChessPieces,
};
