import React, { useState, useEffect, useMemo } from 'react';
import Modal from 'shared/components/Modal';
import TextField from 'shared/components/FormControls/TextField';
import TextArea from 'shared/components/FormControls/TextArea';
import { ActionType, Question } from 'shared/types';
import FormLabel from 'shared/components/FormControls/FormLabel';
import Checkbox from 'shared/components/FormControls/Checkbox';
import './QuestionDialog.css';
import Tooltip from 'shared/components/Tooltip';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (questionData: Question, withDelay: boolean) => void;
  selectedQuestion: Question | null;
  type: ActionType;
}

const QuestionDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedQuestion,
  type,
  onSubmit,
}) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [withDelay, setWithDelay] = useState(false);

  const title = type === 'add' ? 'Add Question' : 'Edit Question';
  const tooltipMessage =
    type === 'add'
      ? 'Here you can create new questions and their answers'
      : 'Here you can edit questions and their answers';

  useEffect(() => {
    setQuestion(selectedQuestion);
  }, [selectedQuestion]);

  const isSubmitDisabled = useMemo(() => {
    return !question?.question || !question?.answer;
  }, [question]);

  const handleQuestionChange = (key: keyof Question, value: string) => {
    if (question) {
      setQuestion((prev) => ({ ...(prev as Question), [key]: value }));
    }
  };

  const handleToggleDelay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithDelay(event.target.checked);
  };

  const handleOnSubmit = () => {
    if (question) {
      onSubmit(question, withDelay);
    }
  };

  const handleClose = () => {
    setQuestion(selectedQuestion);
    onClose();
  };

  if (!question) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={<Tooltip title={tooltipMessage}>{title}</Tooltip>}
      onSubmit={handleOnSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <form className="form">
        <div className="form__field">
          <FormLabel htmlFor="question">Question</FormLabel>
          <TextField
            type="text"
            id="question"
            autoFocus
            value={question?.question || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleQuestionChange('question', e.target.value)
            }
          />
        </div>
        <div className="form__field">
          <FormLabel htmlFor="answer">Answer</FormLabel>
          <TextArea
            rows={6}
            id="answer"
            value={question?.answer || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleQuestionChange('answer', e.target.value)
            }
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
