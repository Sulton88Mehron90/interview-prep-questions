import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../Flashcard/Flashcard';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BrainImage from '../../Images/chess2305job.jpeg';
import WeCanDoit from '../../Images/2305Turing.jpeg';
import GoForItGif from '../../Images/go-for-it-you-can-do-it.gif';
import YouCanDoIt from '../../Images/2305C.jpeg';
import './FlashcardContainer.css';

function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showGif, setShowGif] = useState(false);


  const updateFilteredFlashcards = useCallback(() => {
    let filtered = flashcards;

    if (category !== 'all') {
      filtered = flashcards.filter(card => card.category === category);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        card => card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredFlashcards(shuffleArray(filtered).slice(0, numberOfQuestions));
    setFlippedStates({});
  }, [category, numberOfQuestions, flashcards, searchQuery]);

  useEffect(() => {
    updateFilteredFlashcards();
  }, [updateFilteredFlashcards]);


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleNumberOfQuestionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumberOfQuestions(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/flashcards', { state: { category, numberOfQuestions } });
  };

  const handleRefresh = () => {
    setCategory('all');
    setNumberOfQuestions(1);
    setSearchQuery('');
    updateFilteredFlashcards();
  };

  const toggleGif = () => {
    setShowGif(!showGif);
  };

  return (
    <div className='container' role="main">
      <form onSubmit={handleSubmit} className="category-form">
        <div className="exit-and-brain-container">
          <img src={WeCanDoit} alt="boxing" className="emoji" onClick={handleRefresh} />
        </div>
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
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="update-button">Update</button>
        <Link to="/" className="form-exit-button" aria-label="Return to home">Exit</Link>
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
        <div className='image-container'>
          {showGif ? (
            <>
              <img src={GoForItGif} alt="Go For It" className="go-for-it-gif" onClick={toggleGif} />
            </>
          ) : (
            <>
              <img src={BrainImage} alt="Brain" className="brain-img" onClick={handleRefresh} />
              <img src={YouCanDoIt} alt="Special Image" className="special-image" onClick={toggleGif} />
            </>
          )}
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
