import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BrainImage from '../../Images/brain2.png';
import './FlashcardContainer.css';

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export default function FlashcardContainer({ flashcards }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.category || 'all');

  const [numberOfQuestions, setNumberOfQuestions] = useState(location.state?.numberOfQuestions || 1);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const [flippedStates, setFlippedStates] = useState({});

  useEffect(() => {
    let filtered = flashcards;

    if (category !== 'all') {
      filtered = flashcards.filter(card => card.category === category);
    } else {
      filtered = shuffleArray([...flashcards]);
    }

    setFilteredFlashcards(filtered.slice(0, numberOfQuestions));

    setFlippedStates({});

  }, [category, numberOfQuestions, flashcards]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleNumberOfQuestionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setNumberOfQuestions(value);
    } else if (e.target.value === "") {
      setNumberOfQuestions(1);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate('/flashcards', { state: { category, numberOfQuestions } });
  };

  return (
    <div className='container' role="main">
        <div className='card-grid' aria-live="polite"></div>
      <form onSubmit={handleSubmit} className="category-form">
        <label htmlFor="category-select">Category:</label>
        <select id="category-select" value={category} onChange={handleCategoryChange} required>
          <option value="all">All</option>
          <option value="fe">Frontend</option>
          <option value="be">Backend</option>
          <option value="behavioral">Behavioral</option>
        </select>
        <label htmlFor="number-of-questions">Number of Questions:</label>
        <input
          className="smaller-text"
          id="number-of-questions"
          type="number"
          value={numberOfQuestions}
          onChange={handleNumberOfQuestionsChange}
          min="1"
          max="154"
          required
        />
        <button type="submit" className="update-button">Update</button>
      </form>
      <div className='card-grid' aria-live="polite">
        {filteredFlashcards.map((flashcard, index) => (
          <Flashcard
            key={flashcard.id || index}
            flashcard={flashcard}
            flipped={flippedStates[flashcard.id]}
            onFlip={() => setFlippedStates({ ...flippedStates, [flashcard.id]: !flippedStates[flashcard.id] })}
          />
        ))}
        <div className="exit-and-brain-container">
          <Link to="/" className="button go-back-button" aria-label="Return to home">Exit</Link>
          <img src={BrainImage} alt="Brain" className="brain-img" />
        </div>
      </div>
    </div>
  );
}

FlashcardContainer.propTypes = {
  flashcards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
