import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faEye, faForward, faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/MathRiddles.css';

const MathRiddles = () => {
  const riddles = [
    { question: 'ऐसा क्या है जो मिनट में एक बार, पल में दो बार, लेकिन हजार साल में कभी नहीं आता?', answer: 'अक्षर म' },
    { question: 'मैं एक विषम संख्या हूँ। एक अक्षर हटाओ तो मैं सम बन जाता हूँ। मैं कौन सा संख्या हूँ?', answer: 'सात' },
    { question: 'मैं बिना मुंह के बोलता हूँ और बिना कान के सुनता हूँ। मेरा कोई शरीर नहीं है, लेकिन मैं हवा के साथ जीवित हो जाता हूँ। मैं कौन हूँ?', answer: 'एक प्रतिध्वनि' },
    { question: 'जितना अधिक आप लेते हैं, उतना ही अधिक पीछे छोड़ते हैं। मैं क्या हूँ?', answer: 'पदचिन्ह' },
    { question: 'मैं जीवित नहीं हूँ, लेकिन मैं बढ़ता हूँ; मेरे पास फेफड़े नहीं हैं, लेकिन मुझे हवा चाहिए; मेरा कोई मुंह नहीं है, लेकिन पानी मुझे मार देता है। मैं क्या हूँ?', answer: 'आग' },
    { question: 'मेरे पास चाबियाँ हैं लेकिन मैं ताले नहीं खोल सकता। मेरे पास जगह है लेकिन कोई कमरा नहीं है। आप प्रवेश कर सकते हैं, लेकिन आप बाहर नहीं जा सकते। मैं क्या हूँ?', answer: 'एक कीबोर्ड' },
    { question: 'मेरे पास सिर है, पूंछ है, भूरे रंग का है, और कोई पैर नहीं है। मैं क्या हूँ?', answer: 'एक पैसा' },
    { question: 'आप इसे इस्तेमाल करने से पहले इसे तोड़ना पड़ता है। यह क्या है?', answer: 'एक अंडा' },
    { question: 'मैं छेदों से भरा हुआ हूँ लेकिन फिर भी पानी पकड़ता हूँ। मैं क्या हूँ?', answer: 'एक स्पंज' },
    { question: 'जो जितना सूखता है उतना ही गीला होता है?', answer: 'एक तौलिया' },
  ];

  const [currentRiddle, setCurrentRiddle] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const { speak, voices } = useSpeechSynthesis();
  const hindiVoice = voices.find((voice) => voice.lang === 'hi-IN');

  const handleNextRiddle = () => {
    setCurrentRiddle((prevRiddle) => (prevRiddle + 1) % riddles.length);
    setShowAnswer(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setScore((prevScore) => prevScore + 1);
  };

  const handleSpeakRiddle = () => {
    if (hindiVoice) {
      speak({ text: riddles[currentRiddle].question, voice: hindiVoice });
    }
  };

  useEffect(() => {
    setShowAnswer(false);
  }, [currentRiddle]);

  return (
    <div className="math-riddles">
      <h2 className="title">Math Riddles</h2>
      <div className="score">
        <FontAwesomeIcon icon={faStar} /> {score}
      </div>
      <div className="riddle-card">
        <p className="question">{riddles[currentRiddle].question}</p>
        {showAnswer && (
          <p className="answer">{riddles[currentRiddle].answer}</p>
        )}
        {!showAnswer && (
          <button className="show-answer-btn" onClick={handleShowAnswer}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        )}
        <button className="speak-btn" onClick={handleSpeakRiddle}>
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
      </div>
      <button className="next-riddle" onClick={handleNextRiddle}>
        <FontAwesomeIcon icon={faForward} /> Next
      </button>
    </div>
  );
};

export default MathRiddles;
