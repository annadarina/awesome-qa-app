import React from 'react';
import Placeholder from 'shared/components/Placeholder';
import { useAppSelector, useAppDispatch } from 'shared/store/hooks';
import QuestionCard from 'shared/components/QuestionCard';
import { Question, ModalTypes } from 'shared/types';
import QuestionDialog from '../QuestionDialog';
import Header from 'shared/components/Header';
import './QuestionsList.css';
import RemoveDialog from '../RemoveDialog';
import Tooltip from 'shared/components/Tooltip';
import { showModal } from 'shared/store/modals/modalsSlice';

const QuestionsList = () => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.questions);

  const handleEdit = (question: Question) => {
    dispatch(
      showModal({ modalType: ModalTypes.EDIT, modalProps: { question } })
    );
  };

  const handleOpenRemoveDialog = (question: Question) => {
    dispatch(
      showModal({
        modalType: ModalTypes.REMOVE_QUESTION,
        modalProps: { question },
      })
    );
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

      <QuestionDialog type={ModalTypes.EDIT} />
      <RemoveDialog type={ModalTypes.REMOVE_QUESTION} />
    </div>
  );
};

export default QuestionsList;
