// FlashcardContainer.js
import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
import '../FlashcardContainer/FlashcardContainer.css';
import BrainImage from '../../Images/brain2.png';
import { Link } from 'react-router-dom';

export default function FlashcardContainer({ flashcards }) {
  return (
    <div className='container' role="main">
      <div className='card-grid' aria-live="polite">
        {flashcards.map((flashcard, index) => (
          // Use the unique id for key if available, otherwise use index
          <Flashcard flashcard={flashcard} key={flashcard.id || index} />
        ))}
        <Link to="/" className="button go-back-button" aria-label="Return to home">Exit</Link>
        <img src={BrainImage} alt="Brain" role="presentation" />
      </div>
    </div>
  );
}

FlashcardContainer.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Accept either string or number for id
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};
