import React from 'react';
import Modal from 'shared/components/Modal';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isRemoveAll: boolean;
  name?: string;
}

const RemoveDialog: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  name,
  isRemoveAll,
}) => {
  const message = isRemoveAll ? (
    'Are you sure?'
  ) : (
    <>
      Are you sure you want to remove "<b>{name}</b>" question
    </>
  );

  return (
    <Modal
      isOpen={open}
      onSubmit={onSubmit}
      title={isRemoveAll ? 'Remove All Questions' : 'Remove Question'}
      onClose={onClose}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default RemoveDialog;
