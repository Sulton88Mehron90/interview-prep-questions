import React from 'react';
import { Link } from 'react-router-dom';
import Chess from '../../Images/chess.png'; 
import './HomePage.css'; 

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__content">
        <div className="home__title-wrapper">
          <h1 className="home__title">
            M <img src={Chess} alt="Chess piece" className="home__image" /> D4 Interview Prep
          </h1>
        </div>
        <Link to="/flashcards" className="home__start-button">Let's Practice</Link>
      </div>
    </div>
  );
}
