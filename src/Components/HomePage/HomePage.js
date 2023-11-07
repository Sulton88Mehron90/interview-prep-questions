import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage/HomePage.css';

export default function HomePage() {
  return (
    <div className="home">
      <h1 className="home__title">Welcome to the Flashcard App</h1>
      <Link to="/flashcards" className="home__start-button">Start Learning</Link>
    </div>
  );
}
