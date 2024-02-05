import React, { useState } from 'react';
import { Question } from 'shared/types';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as RemoveIcon } from '../../assets/remove.svg';
import IconButton from '../IconButton';
import Header from '../Header';
import './QuestionCard.css';

interface Props {
  question: Question;
  onEdit: () => void;
  onRemove: () => void;
}

const QuestionCard: React.FC<Props> = ({ question, onEdit, onRemove }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswerVisibility = () => {
    setShowAnswer((prevShowAnswer) => !prevShowAnswer);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      toggleAnswerVisibility();
    }
  };

  return (
    <div className="question-card" data-testid="card">
      <div className="question-card__wrapper">
        <div
          data-testid="cardHeader"
          className="question-card__header"
          onClick={toggleAnswerVisibility}
        >
          <Header
            as="h3"
            className="question-card__title"
            tabIndex={0}
            onKeyDown={handleKeyPress}
          >
            {question.question}
          </Header>
          <div
            className={`question-card__actions ${
              showAnswer ? 'question-card__actions--show' : ''
            }`}
          >
            <IconButton
              onClick={handleEdit}
              label="editButton"
              className="question-card__edit"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleRemove}
              label="removeButton"
              className="question-card__remove"
            >
              <RemoveIcon />
            </IconButton>
          </div>
        </div>

        <div
          data-testid="cardBody"
          className={`question-card__content-wrapper ${
            showAnswer ? 'question-card__content-wrapper--show' : ''
          }`}
        >
          <div className="question-card__content">
            <p className="question-card__answer">{question.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuestionCard;
