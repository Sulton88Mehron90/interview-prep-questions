import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css'; // Ensure this path is correct

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');

  const frontEl = useRef(null);
  const backEl = useRef(null);

  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };

  useEffect(() => {
    setMaxHeight();
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, [flashcard.question, flashcard.answer]); // Recalculate height if the question or answer changes

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="card-inner">
        <div className="front" ref={frontEl}>
          {flashcard.question}
        </div>
        <div className="back" ref={backEl}>
          {flashcard.answer}
        </div>
      </div>
    </div>
  );
}

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
};
