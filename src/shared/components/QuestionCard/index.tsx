import React, { useState } from 'react';
import { Question } from 'shared/types';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as RemoveIcon } from '../../assets/remove.svg';
import IconButton from '../IconButton';
import './QuestionCard.css';

interface Props {
  question: Question;
  onEdit: () => void;
  onRemove: () => void;
}

const QuestionCard: React.FC<Props> = ({ question, onEdit, onRemove }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswerVisibility = () => {
    setShowAnswer(!showAnswer);
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
    <div className="question-card">
      <div className="question-card__wrapper">
        <div
          data-testid="cardHeader"
          className="question-card__header"
          onClick={toggleAnswerVisibility}
        >
          <h3
            className="question-card__title"
            tabIndex={0}
            onKeyDown={handleKeyPress}
          >
            {question.question}
          </h3>
          <div
            className={`question-card__actions ${
              showAnswer ? 'question-card__actions--show' : ''
            }`}
          >
            <IconButton onClick={handleEdit} className="question-card__edit">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleRemove}
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
