// main.js
import board from './components/board.js';
import piece from './components/piece.js';
import chessService from './services/chessService.js';

// Here we initialize the board and render the pieces
board.createChessBoard();
piece.renderChessPieces(chessService.initialChessState);
