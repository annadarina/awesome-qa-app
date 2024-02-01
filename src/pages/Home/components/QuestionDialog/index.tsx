import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import TextField from 'shared/components/FormControls/TextField';
import TextArea from 'shared/components/FormControls/TextArea';
import { ActionType, Question } from 'shared/types';
import FormLabel from 'shared/components/FormControls/FormLabel';
import Checkbox from 'shared/components/FormControls/Checkbox';
import './QuestionDialog.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (questionData: Omit<Question, 'id'>, withDelay: boolean) => void;
  selectedQuestion: Omit<Question, 'id'>;
  type: ActionType;
}

const QuestionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedQuestion,
  type,
  onSubmit,
}) => {
  const [question, setQuestion] =
    useState<Omit<Question, 'id'>>(selectedQuestion);
  const [withDelay, setWithDelay] = useState(false);

  const title = type === 'add' ? 'Add Question' : 'Edit Question';

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion((prev) => ({ ...prev, question: e.target.value }));
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion((prev) => ({ ...prev, answer: e.target.value }));
  };

  const handleToggleDelay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithDelay(event.target.checked);
  };

  const handleOnSubmit = () => {
    onSubmit(question, withDelay);
  };

  const handleClose = () => {
    setQuestion(selectedQuestion);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      onSubmit={handleOnSubmit}
      isSubmitDisabled={Object.values(question).some((value) => !value)}
    >
      <form className="form">
        <div className="form__field">
          <FormLabel htmlFor="question">Question</FormLabel>
          <TextField
            type="text"
            id="question"
            value={question?.question || ''}
            onChange={handleQuestionChange}
          />
        </div>
        <div className="form__field">
          <FormLabel htmlFor="answer">Answer</FormLabel>
          <TextArea
            rows={6}
            id="answer"
            value={question?.answer || ''}
            onChange={handleAnswerChange}
          />
        </div>
        <div className="form__field">
          <Checkbox
            label="Add with 5 seconds delay"
            id="withDelay"
            checked={withDelay}
            onChange={handleToggleDelay}
          />
        </div>
      </form>
    </Modal>
  );
};

export default QuestionDialog;
