import React from 'react';
import Modal from '../Modal';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  name: string;
}
const RemoveQuestionDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  name,
}) => {
  return (
    <Modal
      isOpen={open}
      onSubmit={onSubmit}
      title="Remove Question"
      onClose={onClose}
    >
      <p>
        Are you sure you want to remove "<b>{name}</b>" question?
      </p>
    </Modal>
  );
};

export default RemoveQuestionDialog;
