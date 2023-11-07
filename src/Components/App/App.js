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
  
  const [selectedCategory, setSelectedCategory] = useState('fe');
  

  const [triviaLoading, setTriviaLoading] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getQuestionsByCategory = () => {
    switch (selectedCategory) {
      case 'fe':
        return feQuestions;
      case 'behavioral':
        return behavioralInterviewQuestions;
      case 'be':
        return beQuestions;
      default:
        return [];
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage handleCategoryChange={handleCategoryChange} />} />
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
              flashcards={getQuestionsByCategory()}
              selectedCategory={selectedCategory}
            />
          }
        />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}
