import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
import { useNavigate, useLocation } from 'react-router-dom';
import '../FlashcardContainer/FlashcardContainer.css';
import BrainImage from '../../Images/brain2.png';
import { Link } from 'react-router-dom';

export default function FlashcardContainer({ flashcards }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [category, setCategory] = useState(location.state?.category || 'fe');
  const [numberOfQuestions, setNumberOfQuestions] = useState(location.state?.numberOfQuestions || 3);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);

  useEffect(() => {
    const filtered = flashcards.filter(card => card.category === category);
    setFilteredFlashcards(filtered.slice(0, numberOfQuestions));
  }, [category, numberOfQuestions, flashcards]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleNumberOfQuestionsChange = (e) => {
    setNumberOfQuestions(parseInt(e.target.value, 10));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filtered = flashcards.filter(card => card.category === category);
    setFilteredFlashcards(filtered.slice(0, numberOfQuestions));
  };

  return (
    <div className='container' role="main">
      <form onSubmit={handleSubmit} className="category-form">
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="fe">Frontend</option>
            <option value="be">Backend</option>
            <option value="behavioral">Behavioral</option>
          </select>
        </label>
        <label>
          Number of Questions:
          <input 
            type="number" 
            value={numberOfQuestions} 
            onChange={handleNumberOfQuestionsChange}
            min="1" 
            max="100" 
          />
        </label>
        <button type="submit">Update</button>
      </form>
      <div className='card-grid' aria-live="polite">
        {filteredFlashcards.map((flashcard, index) => (
          <Flashcard key={flashcard.id || index} flashcard={flashcard} />
        ))}
        <Link to="/" className="button go-back-button" aria-label="Return to home">Exit</Link>
        <img src={BrainImage} alt="Brain" className="brain-img" />
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
