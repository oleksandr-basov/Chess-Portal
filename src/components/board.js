// board.js
import chessService from '../services/chessService.js';

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

export default {
    createChessBoard,
};
