import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HistoryRealm.css';

const HistoryRealm = () => {
  return (
    <div className="history-realm">
      <h2>Welcome to the History Realm</h2>
      <p>Travel back in time and learn about history!</p>
      <Link to="/puzzle-game">
        <button>Start Puzzle Game</button>
      </Link>
      <Link to="/quiz-game">
        <button>Start Quiz Game</button>
      </Link>
    </div>
  );
};

export default HistoryRealm;
