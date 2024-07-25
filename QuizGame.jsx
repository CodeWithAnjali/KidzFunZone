//QuizGamejsx//
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import correctSound from '../sounds/correct.wav'; // Replace with your actual sound path
import wrongSound from '../sounds/wrong.mp3'; // Replace with your actual sound path
import '../styles/QuizGame.css';

const initialQuestions = [
  { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  { question: "What is the capital of France?", options: ["London", "Paris", "Berlin"], answer: "Paris" },
  { question: "What color is the sky?", options: ["Blue", "Green", "Red"], answer: "Blue" },
  { question: "How many legs does a spider have?", options: ["6", "8", "10"], answer: "8" },
  { question: "What is H2O?", options: ["Water", "Oxygen", "Hydrogen"], answer: "Water" },
  { question: "What is the square root of 9?", options: ["2", "3", "4"], answer: "3" },
  { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"], answer: "Mars" },
  { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Shark"], answer: "Blue Whale" },
  { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C"], answer: "100°C" },
  { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe"], answer: "Au" },
];

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Select a random subset of questions
const selectRandomQuestions = (questions, numQuestions) => {
  const shuffledQuestions = shuffleArray([...questions]);
  return shuffledQuestions.slice(0, numQuestions);
};

// Text-to-speech function
const speakText = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

const QuizGame = () => {
  const numQuestions = 5; // Number of questions per quiz
  const [questions, setQuestions] = useState(selectRandomQuestions(initialQuestions, numQuestions));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [playCorrectSound] = useSound(correctSound);
  const [playWrongSound] = useSound(wrongSound);

  useEffect(() => {
    resetQuiz();
  }, []);

  useEffect(() => {
    const questionText = questions[currentQuestion].question;
    const optionsText = questions[currentQuestion].options.join(", ");
    speakText(`${questionText}. Options are: ${optionsText}`);
  }, [currentQuestion, questions]);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
      playCorrectSound();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000); // Show confetti for 2 seconds
    } else {
      playWrongSound();
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = score + 1;
      speakText(`Congratulations! You completed all the tasks. Your score is ${finalScore}`);
      setShowBanner(true);
      setShowModal(true);
    }
  };

  const resetQuiz = () => {
    setQuestions(selectRandomQuestions(initialQuestions, numQuestions));
    setCurrentQuestion(0);
    setScore(0);
    setShowModal(false);
    setShowBanner(false);
  };

  return (
    <div className="quiz-game">
      <h2>Answer the Questions</h2>
      <div className="question">
        <p>{questions[currentQuestion].question}</p>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(option)}>{option}</button>
          ))}
        </div>
      </div>
      {showConfetti && <Confetti />}
      {showBanner && <div className="congratulations-banner">Congratulations! You completed all the tasks!</div>}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Congratulations! You completed all the tasks! Your score is {score}.</p>
            <button onClick={resetQuiz}>Restart Quiz</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizGame;


