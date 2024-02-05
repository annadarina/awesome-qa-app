import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './index';
import userEvent from '@testing-library/user-event';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  const renderModal = (
    props: Partial<React.ComponentProps<typeof Modal>> = {}
  ) =>
    render(
      <Modal isOpen onClose={mockOnClose} title="Test Modal" {...props}>
        {'Modal Content' || props.children}
      </Modal>
    );

  beforeEach(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }
  });

  it('renders without crashing', () => {
    renderModal();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders nothing if the modal is closed', () => {
    renderModal({ isOpen: false });
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    renderModal();

    const closeButton = screen.getByLabelText('closeButton');

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside modal content', () => {
    renderModal();

    fireEvent.mouseDown(screen.getByTestId('modal-overlay'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when pressing the Escape key', () => {
    renderModal();

    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applies correct class when modal is visible', () => {
    renderModal();

    const overlay = screen.getByTestId('modal-overlay');

    expect(overlay).toHaveClass('show');
  });

  it('moves focus from the first to the last focusable element when pressing Tab and moves back to the first one', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <button>First Button</button>
        <button>Second Button</button>
      </Modal>
    );

    const firstButton = screen.getByText('First Button');
    const lastButton = screen.getByText('Second Button');
    const closeButton = screen.getByLabelText('closeButton');

    firstButton.focus();
    userEvent.tab();

    expect(lastButton).toHaveFocus();
    userEvent.tab();

    expect(closeButton).toHaveFocus();
  });
});
