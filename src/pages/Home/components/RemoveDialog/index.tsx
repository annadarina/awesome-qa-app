import React from 'react';
import './RemoveDialog.css';

import Modal from 'shared/components/Modal';

import { useAppSelector, useAppDispatch } from 'shared/store/hooks';
import { hideModal } from 'shared/store/modals/modalsSlice';
import Button from 'shared/components/Button';
import {
  removeAllQuestions,
  removeQuestion,
} from 'shared/store/questions/questionsSlice';
import { ModalTypes } from 'shared/types';

interface Props {
  type: ModalTypes.REMOVE_QUESTION | ModalTypes.REMOVE_ALL;
}

const RemoveDialog: React.FC<Props> = ({ type }) => {
  const { currentModal, modalProps } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();

  const title =
    type === ModalTypes.REMOVE_ALL ? 'Remove All Questions' : 'Remove Question';

  const message =
    type == ModalTypes.REMOVE_ALL ? (
      'Are you sure?'
    ) : (
      <>
        Are you sure you want to remove "<b>{modalProps?.question?.question}</b>
        " question?
      </>
    );

  const handleSubmit = () => {
    if (type === ModalTypes.REMOVE_ALL) {
      dispatch(removeAllQuestions());
    }

    if (type === ModalTypes.REMOVE_QUESTION) {
      dispatch(removeQuestion(modalProps?.question?.id as string));
    }

    dispatch(hideModal());
  };

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <Modal isOpen={currentModal === type} title={title} onClose={handleClose}>
      <p className="remove-dialog__message">{message}</p>
      <div className="form__actions">
        <Button
          data-testid="submitButton"
          type="submit"
          variant="primary"
          autoFocus
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button data-testid="cancelButton" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default RemoveDialog;
