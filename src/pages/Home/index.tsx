import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

const emptyQuestion = { id: uuidv4(), answer: '', question: '' };

const Home = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  const handleAdd = () => {
    setOpen(true);
    setSelectedQuestion(emptyQuestion);
  };

  const handleSortAll = () => {
    dispatch(sortQuestions());
  };

  const handleRemoveAll = () => {
    dispatch(removeAllQuestions());
  };

  const handleSubmitQuestion = (question: Question, withDelay: boolean) => {
    dispatch(addQuestion(question));
    console.log({ withDelay });
  };

  return (
    <div className="layout">
      <Header
        onAdd={handleAdd}
        onRemoveAll={handleRemoveAll}
        onSortAll={handleSortAll}
      />

      <main className="layout__content">
        <QuestionsList />
      </main>

      <QuestionDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        type="add"
        onSubmit={handleSubmitQuestion}
        selectedQuestion={selectedQuestion}
      />
    </div>
  );
};

export default Home;
