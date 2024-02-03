import React, { useState, useMemo, useEffect } from 'react';
import FormLabel from 'shared/components/FormControls/FormLabel';
import TextField from 'shared/components/FormControls/TextField';
import TextArea from 'shared/components/FormControls/TextArea';
import Checkbox from 'shared/components/FormControls/Checkbox';
import { Question, QuestionFormData } from 'shared/types';
import Button from 'shared/components/Button';
import './QuestionFrom.css';
import { useAppSelector } from 'shared/store/hooks';

interface Props {
  onSubmit: (formData: QuestionFormData) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const QuestionForm: React.FC<Props> = ({ onSubmit, onCancel, isLoading }) => {
  const [question, setQuestion] = useState<Question>({
    id: '',
    question: '',
    answer: '',
  });
  const [isAsync, setIsAsync] = useState(false);

  const { modalProps } = useAppSelector((state) => state.modals);

  useEffect(() => {
    if (modalProps?.question) {
      setQuestion(modalProps?.question);
    }
  }, [modalProps]);

  const isSubmitDisabled = useMemo(() => {
    return !question?.question || !question?.answer;
  }, [question]);

  const handleQuestionChange = (key: keyof Question, value: string) => {
    const updQuestion = { ...question, [key]: value };
    setQuestion(updQuestion);
  };

  const handleToggleDelay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAsync(event.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ question, isAsync });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <FormLabel htmlFor="question">Question</FormLabel>
        <TextField
          type="text"
          id="question"
          autoFocus
          disabled={isLoading}
          value={question.question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleQuestionChange('question', e.target.value)
          }
        />
      </div>
      <div className="form__field">
        <FormLabel htmlFor="answer">Answer</FormLabel>
        <TextArea
          rows={10}
          id="answer"
          placeholder={'Add new question'}
          value={question.answer}
          disabled={isLoading}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleQuestionChange('answer', e.target.value)
          }
        />
      </div>
      <div className="form__field">
        <Checkbox
          label="Add with 5 seconds delay"
          id="isAsync"
          checked={isAsync}
          disabled={isLoading}
          onChange={handleToggleDelay}
        />
      </div>
      <div className="form__actions">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitDisabled || isLoading}
          isLoading={isLoading}
        >
          Submit
        </Button>
        <Button
          disabled={isLoading}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            onCancel();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
