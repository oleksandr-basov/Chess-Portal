// chessService.js
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

const getCellCoordinates = (cell) => {
    const idSplit = cell.id.split('-');
    return { x: parseInt(idSplit[2]), y: parseInt(idSplit[1]) };
}

const isLegalMove = (fromCell, toCell, pieceType, pieceColor) => {
    // Determine the cell coordinates
    const fromCoord = getCellCoordinates(fromCell);
    const toCoord = getCellCoordinates(toCell);

    // Return false if the starting and ending cells are the same
    if (fromCoord.x === toCoord.x && fromCoord.y === toCoord.y) {
        return false;
    }

    // For this example, we'll just implement movement rules for pawns
    if ('pawn' === pieceType) {
        if (pieceColor === 'white') {
            // White pawns can only move upwards (y decreases)
            return fromCoord.x === toCoord.x && fromCoord.y - 1 === toCoord.y;
        } else if (pieceColor === 'black') {
            // Black pawns can only move downwards (y increases)
            return fromCoord.x === toCoord.x && fromCoord.y + 1 === toCoord.y;
        }
    }

    // If we don't recognize the piece type, just return false
    return false;
}

export default {
    chessPieces,
    initialChessState,
    getCellCoordinates,
    isLegalMove,
};
