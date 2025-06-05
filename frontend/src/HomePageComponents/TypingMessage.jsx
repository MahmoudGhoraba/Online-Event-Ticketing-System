import React, { useState, useEffect } from 'react';
import { useTheme } from '../theme/ThemeContext';

const messages = [
  "Welcome to Spaghetti's",
  "Best place to book your ticket",
  "Spaghetti for Life."
];

function TypingMessage() {
  const [displayedText, setDisplayedText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    let timeoutId;

    if (isTyping) {
      if (displayedText.length < messages[messageIndex].length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(messages[messageIndex].slice(0, displayedText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(messages[messageIndex].slice(0, displayedText.length - 1));
        }, 50);
      } else {
        setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isTyping, messageIndex]);

  const typingStyle = {
    fontSize: '3.5rem',
    fontWeight: 700,
    color: isDarkMode ? 'white' : 'black',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    position: 'relative',
    display: 'inline-block',
  };

  return <div id="welcomeMessage" style={typingStyle}>{displayedText}</div>;
}

export default TypingMessage;
