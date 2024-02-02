import React, { useState } from 'react';
import Placeholder from 'shared/components/Placeholder';
import { useAppSelector, useAppDispatch } from 'shared/store/hooks';
import QuestionCard from 'shared/components/QuestionCard';
import { Question } from 'shared/types';
import QuestionDialog from '../QuestionDialog';
import Header from 'shared/components/Header';
import './QuestionsList.css';
import {
  editQuestion,
  removeQuestion,
} from 'shared/store/questions/questionsSlice';
import RemoveDialog from '../RemoveDialog';
import Tooltip from 'shared/components/Tooltip';

const QuestionsList = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
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
    setOpenRemoveDialog(true);
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
        <Tooltip title="Here you can find created questions and their answers">
          <Header as="h2">Created Questions</Header>
        </Tooltip>
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
      <RemoveDialog
        open={openRemoveDialog}
        onSubmit={handleRemove}
        onClose={() => setOpenRemoveDialog(false)}
        name={selectedQuestion?.question || ''}
        isRemoveAll={false}
      />
    </div>
  );
};

export default QuestionsList;
