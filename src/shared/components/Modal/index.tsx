import React, { useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);

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
      // Cleanup: re-enable scrolling if modal is unmounted
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleTabPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Extend this list if needed
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, input, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.key === 'Tab') {
      // Move focus to the first element if currently on the last element
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  if (!modalRoot || !isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={`modal__overlay ${isOpen ? 'show' : ''} `}
        onClick={onClose}
      >
        <div
          className="modal"
          // prevent modal close when click inside modal body
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
          onKeyDown={handleTabPress}
        >
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
