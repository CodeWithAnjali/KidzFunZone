// src/components/WelcomeScreen.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/WelcomeScreen.css';
import { useSpeechSynthesis } from 'react-speech-kit';
import { setupSpeechRecognition, speakText } from '../speechUtils';

const WelcomeScreen = () => {
  const [question, setQuestion] = useState('');
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    // Initial greeting
    speakText("Hello! How are you?", speak);
    handleSpeechRecognition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSpeechRecognition = () => {
    const recognition = setupSpeechRecognition(handleAnswer);
    recognition.start();
  };

  const handleAnswer = (answer) => {
    // Normalize answer for better matching
    const normalizedAnswer = answer.toLowerCase();

    // Ask "What's your name?"
    if (normalizedAnswer.includes('hello') || normalizedAnswer.includes('hi')) {
      speakText('What is your name?', speak);
      setQuestion('What is your name?');
    } else if (question.toLowerCase().includes('what is your name')) {
      speakText(`Hello, ${normalizedAnswer}.`, speak);
    } else {
      speakText(`I'm sorry, I didn't understand.`, speak);
    }
  };

  return (
    <div className="welcome-screen">
      <div className="character"></div>
      <Link to="/profile-creation" className="start-button">
        Get Started
      </Link>
    </div>
  );
};

export default WelcomeScreen;







