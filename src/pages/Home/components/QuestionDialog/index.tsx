import React, { useMemo } from 'react';
import Modal from 'shared/components/Modal';
import Tooltip from 'shared/components/Tooltip';
import {
  addQuestion,
  editQuestion,
} from 'shared/store/questions/questionsSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { hideModal } from 'shared/store/modals/modalsSlice';
import { submitQuestionAsync } from 'shared/store/questions/handleAsync';
import QuestionForm from '../QuestionForm';
import { QuestionFormData, ModalTypes } from 'shared/types';

interface Props {
  type: ModalTypes.ADD | ModalTypes.EDIT;
}

const QuestionDialog: React.FC<Props> = ({ type }) => {
  const dispatch = useAppDispatch();

  const { isUpdateLoading, isAddNewLoading } = useAppSelector(
    (state) => state.questions
  );
  const { currentModal } = useAppSelector((state) => state.modals);

  const title = type === ModalTypes.ADD ? 'Add Question' : 'Edit Question';
  const tooltipMessage =
    type === ModalTypes.ADD
      ? 'Here you can create new questions and their answers'
      : 'Here you can edit questions and their answers';

  const isLoading = useMemo(() => {
    return type === ModalTypes.ADD ? isAddNewLoading : isUpdateLoading;
  }, [isAddNewLoading, isUpdateLoading, type]);

  const handleOnSubmit = (formData: QuestionFormData) => {
    const { question, isAsync } = formData;

    if (isAsync) {
      dispatch(submitQuestionAsync({ question, type }));
    } else {
      const action =
        type === ModalTypes.ADD
          ? addQuestion(question)
          : editQuestion(question);
      dispatch(action);
    }

    dispatch(hideModal());
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal
      isOpen={currentModal === type || isLoading}
      onClose={handleClose}
      title={
        <Tooltip title={tooltipMessage}>
          <span tabIndex={0}>{title}</span>
        </Tooltip>
      }
    >
      <QuestionForm
        onSubmit={handleOnSubmit}
        onCancel={handleClose}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default QuestionDialog;
