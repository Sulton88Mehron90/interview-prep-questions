import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Flashcard.css';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');
  
  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current ? frontEl.current.getBoundingClientRect().height : 0;
    const backHeight = backEl.current ? backEl.current.getBoundingClientRect().height : 0;
    setHeight(Math.max(frontHeight, backHeight, 100)); 
  }

  useEffect(() => {
    setMaxHeight();
    window.addEventListener('resize', setMaxHeight);
    return () => window.removeEventListener('resize', setMaxHeight);
  }, [flashcard.question, flashcard.answer, flip]);

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="card-inner">
        <div className="front card-content" ref={frontEl}>
          {flashcard.question}
        </div>
        <div className="back card-content" ref={backEl}>
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
