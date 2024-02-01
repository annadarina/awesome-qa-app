import React, { useState } from 'react';
import Header from 'shared/components/Header';
import QuestionDialog from './components/QuestionDialog';
import QuestionsList from './components/QuestionsList';
import './Home.css';
import { Question } from 'shared/types';
import { useAppDispatch } from 'shared/store/hooks';
import {
  addQuestion,
  sortQuestions,
  removeAllQuestions,
} from 'shared/store/slices/questionsSlice';

const emptyQuestion = { answer: '', question: '' };

const Home = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddQuestion = (
    questionData: Omit<Question, 'id'>,
    withDelay: boolean
  ) => {
    dispatch(addQuestion(questionData));
    console.log({ withDelay });
  };

  const handleSortAll = () => {
    dispatch(sortQuestions());
  };

  const handleRemoveAll = () => {
    dispatch(removeAllQuestions());
  };

  return (
    <div className="layout">
      <Header
        onAdd={() => setIsOpen(true)}
        onRemoveAll={handleRemoveAll}
        onSortAll={handleSortAll}
      />

      <main className="layout__content">
        <QuestionsList />
      </main>

      <QuestionDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="add"
        onSubmit={handleAddQuestion}
        selectedQuestion={emptyQuestion}
      />
    </div>
  );
};

export default Home;
