import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from 'shared/assets/close.svg';
import IconButton from '../IconButton';
import Header from '../Header';
import './Modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, title, children }) => {
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
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup: re-enable scrolling if modal is unmounted
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!modalRoot || !isOpen) {
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
            <Header as="h3">{title}</Header>
          </header>

          <main className="modal__content">{children}</main>
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
