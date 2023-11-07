import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
// import '../Flashcard/Flashcard.css';
import { Link } from 'react-router-dom';
import '../FlashcardContainer/FlashcardContainer.css';
import BrainImage from '../../Images/brain2.png';

export default function FlashcardContainer({ flashcards }) {
  return (
    <div className='container' role="main">
      <div className='card-grid' aria-live="polite">
        {flashcards.map((flashcard, index) => {
          return <Flashcard question={flashcard.question} answer={flashcard.answer} key={index} />;
        })}
        <Link to="/" className="button go-back-button" aria-label="Return to home">Exit</Link>
        <img src={BrainImage} alt="Decorative" role="presentation" />
      </div>
    </div>
  );
}

FlashcardContainer.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired
    })
  ).isRequired
};
