// src/pages/QuizTaking.tsx
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Question {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  subject: string | null;
}

const QuizTaking: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
useEffect(() => {
  axios.get<Question[]>('http://localhost:8080/api/questions')
    .then((response) => {
      console.log('Fetched questions:', response.data);  // <-- add this line
      setQuestions(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching questions:', error);
      setLoading(false);
    });
}, []);



  // rest of the component


  const handleAnswerOptionClick = (option: string) => {
    if (!selectedOption) {
      setSelectedOption(option);

      const currentQuestion = questions[currentQuestionIndex];
      if (option === currentQuestion.correctAnswer || option === currentQuestion.correctAnswer.toUpperCase()) {
        setScore(score + 1);
      }

      setTimeout(() => {
        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestionIndex(nextQuestion);
          setSelectedOption(null);
        } else {
          setShowScore(true);
        }
      }, 1000);
    }
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available from backend.</div>;
  }

  if (showScore) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">You scored {score} out of {questions.length}</h2>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Question {currentQuestionIndex + 1} of {questions.length}
      </h2>
      <p className="mb-6">{currentQuestion.questionText}</p>
      <div className="grid grid-cols-1 gap-4">
        {[currentQuestion.optionA, currentQuestion.optionB, currentQuestion.optionC, currentQuestion.optionD].map(
          (option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerOptionClick(option)}
              className={`py-2 px-4 border rounded hover:bg-gray-100 ${
                selectedOption === option
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-300'
                    : 'bg-red-300'
                  : ''
              }`}
              disabled={!!selectedOption}
            >
              {option}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default QuizTaking;
