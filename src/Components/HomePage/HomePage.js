import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage/HomePage.css';

export default function HomePage({ handleCategoryChange }) {
  return (
    <div className="home">
      <h1 className="home__title">Welcome to the Flashcard App</h1>
      <select
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="home__category-selector"
      >
        <option value="fe">Frontend Questions</option>
        <option value="be">Backend Questions</option>
        <option value="behavioral">Behavioral Questions</option>
      </select>
      <Link to="/flashcards" className="home__start-button">Start Learning</Link>
    </div>
  );
}
