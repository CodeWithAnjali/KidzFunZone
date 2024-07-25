import React, { useState, useEffect } from 'react';
import '../styles/PuzzleGame.css';

const PuzzleGame = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const shuffledPieces = shuffle([...Array(9).keys()]);
    setPieces(shuffledPieces);
  }, []);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handlePieceClick = (index) => {
    const newPieces = [...pieces];
    const emptyIndex = newPieces.indexOf(8); // Assuming 8 is the empty piece
    if (Math.abs(index - emptyIndex) === 1 || Math.abs(index - emptyIndex) === 3) {
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
    }
  };

  return (
    <div className="puzzle-game">
      <h2>Solve the Puzzle</h2>
      <div className="puzzle-grid">
        {pieces.map((piece, index) => (
          <div key={index} className={`puzzle-piece ${piece === 8 ? 'empty' : ''}`} onClick={() => handlePieceClick(index)}>
            {piece !== 8 && piece + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;

