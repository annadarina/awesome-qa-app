import React, { useState } from 'react';
import AppHeader from 'shared/components/AppHeader';
import QuestionDialog from './components/QuestionDialog';
import QuestionsList from './components/QuestionsList';
import RemoveDialog from './components/RemoveDialog';
import './Home.css';
import { Question } from 'shared/types';
import { useAppDispatch } from 'shared/store/hooks';
import {
  addQuestion,
  sortQuestions,
  removeAllQuestions,
} from 'shared/store/slices/questionsSlice';

const emptyQuestion = { id: '', answer: '', question: '' };

const Home = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
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
      <AppHeader
        onAdd={handleAdd}
        onRemoveAll={() => setOpenRemoveDialog(true)}
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
      <RemoveDialog
        open={openRemoveDialog}
        onSubmit={handleRemoveAll}
        onClose={() => setOpenRemoveDialog(false)}
        isRemoveAll
      />
    </div>
  );
};

export default Home;
