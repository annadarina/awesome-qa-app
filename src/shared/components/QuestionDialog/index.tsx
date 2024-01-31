import React, { useState } from 'react';
import './QuestionDialog.css';
import Modal from '../Modal';
import TextField from '../FormControls/TextField';
import TextArea from '../FormControls/TextArea';
import { ActionType, Question } from '../../types';
import FormLabel from '../FormControls/FormLabel';
import Checkbox from '../FormControls/Checkbox';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedQuestion: Question;
  type: ActionType;
}

const QuestionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedQuestion,
  type,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [question, setQuestion] = useState<Question>(selectedQuestion);
  const [withDelay, setWithDelay] = useState(false);
  const title = type === 'add' ? 'Add Question' : 'Edit Question';

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ question: e.target.value });
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log({ answer: e.target.value });
  };

  const handleToggleDelay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithDelay(event.target.checked);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
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
