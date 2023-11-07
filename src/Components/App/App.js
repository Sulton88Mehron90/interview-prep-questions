import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FlashcardContainer from '../FlashcardContainer/FlashcardContainer';
import HomePage from '../HomePage/HomePage';
import Error404 from '../ErrorHandling/Error404';
import Error500 from '../ErrorHandling/Error500';
import Errors from '../ErrorHandling/Errors';
import feTechnicalQuestions from '../../Data/feTechnicalQuestions.json';
import behavioralQuestions from '../../Data/behavioralQuestions.json';
import beTechnicalQuestions from '../../Data/beTechnicalQuestions.json';
import '../App/App.css';

export default function App() {
  const [feQuestions] = useState(feTechnicalQuestions);
  const [behavioralInterviewQuestions] = useState(behavioralQuestions);
  const [beQuestions] = useState(beTechnicalQuestions);
  const [error, setError] = useState(null);
  const [triviaLoading, setTriviaLoading] = useState(false);

  const allQuestions = [...feQuestions, ...behavioralInterviewQuestions, ...beQuestions];

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route 
          path="/error" 
          element={
            <Errors 
              error={error} 
              setError={setError} 
              setTriviaLoading={setTriviaLoading}
            />
          } 
        />
        <Route
          path="/flashcards"
          element={
            <FlashcardContainer
              flashcards={allQuestions} 
            />
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
