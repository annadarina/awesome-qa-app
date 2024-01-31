import React from 'react';
import Placeholder from 'shared/components/Placeholder';
import { useAppSelector } from 'shared/store/hooks';
import './QuestionsList.css';

const QuestionsList = () => {
  const { questions } = useAppSelector((state) => state.questions);
  console.log('questions', questions);

  return (
    <div className="questions-list">
      <div className="questions-list__header">
        <h1 className="questions-list__title">Created Questions</h1>
        <p className="questions-list__subtitle">
          Here you can find {questions.length}{' '}
          {questions.length === 1 ? 'question' : 'questions'}. Feel free to
          create your own questions
        </p>
      </div>

      <div className="wrapper">
        {!questions.length ? (
          <Placeholder message="No questions yet. Please add your question" />
        ) : (
          'questions'
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
