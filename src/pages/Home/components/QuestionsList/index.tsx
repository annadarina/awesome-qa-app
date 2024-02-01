import React, { useState } from 'react';
import Placeholder from 'shared/components/Placeholder';
import { useAppSelector, useAppDispatch } from 'shared/store/hooks';
import QuestionCard from 'shared/components/QuestionCard';
import './QuestionsList.css';
import { Question } from 'shared/types';
import QuestionDialog from '../QuestionDialog';
import {
  editQuestion,
  removeQuestion,
} from 'shared/store/slices/questionsSlice';
import RemoveQuestionDialog from 'pages/Home/components/RemoveQuestionDialog';

const QuestionsList = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.questions);

  const handleEdit = (question: Question) => {
    setOpenEditDialog(true);
    setSelectedQuestion(question);
  };

  const handleOpenRemoveDialog = (question: Question) => {
    setOpenDeleteDialog(true);
    setSelectedQuestion(question);
  };

  const handleSubmit = (question: Question, withDelay: boolean) => {
    dispatch(editQuestion(question));
    console.log({ withDelay });
  };

  const handleRemove = () => {
    if (selectedQuestion) {
      dispatch(removeQuestion(selectedQuestion.id));
    }
  };

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

      <div className="questions-list__content">
        {!questions.length ? (
          <Placeholder message="No questions yet. Please add your first question" />
        ) : (
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onEdit={() => handleEdit(question)}
              onRemove={() => handleOpenRemoveDialog(question)}
            />
          ))
        )}
      </div>

      <QuestionDialog
        isOpen={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        type="edit"
        onSubmit={handleSubmit}
        selectedQuestion={selectedQuestion}
      />
      <RemoveQuestionDialog
        open={openDeleteDialog}
        onSubmit={handleRemove}
        onClose={() => setOpenDeleteDialog(false)}
        name={selectedQuestion?.question || ''}
      />
    </div>
  );
};

export default QuestionsList;
