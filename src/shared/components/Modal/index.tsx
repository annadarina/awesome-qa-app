import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from 'shared/assets/close.svg';
import IconButton from '../IconButton';
import Button from '../Button';
import './Modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: React.ReactNode;
  isSubmitDisabled?: boolean;
}

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  isSubmitDisabled,
}) => {
  const modalRoot: HTMLElement | null = document.getElementById('modal-root');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup: re-enable scrolling if modal is unmounted
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={`modal__overlay ${isOpen ? 'show' : ''} `}
        onClick={onClose}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <IconButton className="modal__close-button" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <header className="modal__header">
            <h2 className="modal__header-title">{title}</h2>
          </header>

          <main className="modal__content">{children}</main>

          <footer className="modal__footer">
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </footer>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
