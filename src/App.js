import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Questionaire from './components/Questionaire';

const API_URL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple";

function App() {

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    axios.get(API_URL)
      .then(res => res.data)
      .then (data => {
        const questions = data.results.map((question) => ({
          ... question,
          answers:[question.correct_answer, ... question.incorrect_answers].sort(() => Math.random() - 0.5)
        }))

        setQuestions(questions)
      })
  }, [])

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === questions[currentIndex].correct_answer){
        setScore(score+1);
      }
    }
    
    setShowAnswers(true);
    
  }

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex+1);
    setShowAnswers(false);
  }

  return ( questions.length > 0 ? (  
    
    <div className="container1">
    {currentIndex >= questions.length ? (<h1>Game ended, your score is {score}</h1>)
    : (<Questionaire handleAnswer = {handleAnswer}
      showAnswers={showAnswers}
      handleNextQuestion={handleNextQuestion}
      data={questions[currentIndex]}/>)}

    </div>

  ) :  <div className="container1">Loading...</div>


  );
}

export default App;
