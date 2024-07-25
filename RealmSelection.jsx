//RealmSelectionJSX//

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RealmSelection.css';
import useSound from 'use-sound';
import clickSound from '../sounds/click.mp3';
import ConfettiGenerator from 'confetti-js';
import surpriseGif from '../assets/images/suprisebox.gif';

const RealmSelection = () => {
  const [playClick] = useSound(clickSound);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const confettiSettings = { target: 'confetti-canvas' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    return () => confetti.clear();
  }, []);

  const handleButtonClick = () => {
    playClick();
  };

  const handleSurpriseClick = () => {
    playClick();
    setShowSurprise(!showSurprise);
  };

  return (
    <div className="realm-selection">
      <h2>Select a Realm to Explore</h2>
      <div className="realms">
        <Link to="/math-realm" className="realm-link" onClick={handleButtonClick}>
          <button className="realm-button math-realm" data-tooltip="Discover the world of numbers!">
            Math 
          </button>
        </Link>
        <Link to="/science-realm" className="realm-link" onClick={handleButtonClick}>
          <button className="realm-button science-realm" data-tooltip="Explore the wonders of science!">
            Science 
          </button>
        </Link>
        <Link to="/history-realm" className="realm-link" onClick={handleButtonClick}>
          <button className="realm-button history-realm" data-tooltip="Travel back in time!">
            History
          </button>
        </Link>
      </div>
      <div className="surprise-box" onClick={handleSurpriseClick}>
        Click me for a surprise!
      </div>
      {showSurprise && (
        <div className="modal-overlay" onClick={handleSurpriseClick}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <img src={surpriseGif} alt="Surprise" className="surprise-gif" />
            <button className="ok-button" onClick={handleSurpriseClick}>OK</button>
          </div>
        </div>
      )}
      <canvas id="confetti-canvas" className="confetti-canvas"></canvas>
    </div>
  );
};

export default RealmSelection;
