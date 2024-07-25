import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProfileCreation.css';
import useSound from 'use-sound';
import clickSound from '../sounds/soCute.mp3';
import confetti from 'canvas-confetti';

const ProfileCreation = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  const [playClick] = useSound(clickSound);

  const handleSubmit = () => {
    if (name && avatar) {
      localStorage.setItem('playerName', name);
      localStorage.setItem('playerAvatar', avatar);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => navigate('/realm-selection'), 2000);
    } else {
      alert('Please enter your name and select an avatar.');
    }
  };

  const avatars = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s',
    'https://storage.moemate.io/4c9a176be64e0a4b4bc95fcc6453947d5ff9996b/IMG_0838.webp',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXCEerSr1aKB1eSxS7XVRg9QA5hQI1mqnIIVMHXyEUT9ItktLIwWiS8R9H2tAGfa8G6HE&usqp=CAU'
  ];

  return (
    <div className="profile-creation">
      <h2>Create Your Profile</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="avatars">
        {avatars.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Avatar ${index + 1}`}
            onClick={() => {
              setAvatar(src);
              playClick();
            }}
            className={avatar === src ? 'selected' : ''}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Proceed</button>
      <img src={avatar} alt="Selected Avatar" className="selected-avatar" />
    </div>
  );
};

export default ProfileCreation;






