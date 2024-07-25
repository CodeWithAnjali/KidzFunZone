//ScienceRealmeJsx//
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ScienceRealm.css';

const ScienceRealm = () => {
  return (
    <div className="science-realm">
      <h2>Welcome to the Science Realm</h2>
      <p>Explore the wonders of science!</p>
      <div className="buttons">
        <Link to="/puzzle-game">
          <button className="puzzle-button">Puzzel Start</button>
        </Link>
        <Link to="/quiz-game">
          <button className="quiz-button">Quiz Start</button>
        </Link>
      </div>
    </div>
  );
};

export default ScienceRealm;


