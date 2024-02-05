import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import RemoveDialog from './index';
import { ModalTypes } from 'shared/types';
import { renderWrapper } from 'shared/utils';

const mockInitialStore = {
  questions: {
    isUpdateLoading: false,
    isAddNewLoading: false,
    questions: [
      { id: '1', question: 'Question 1', answer: 'Answer 1' },
      { id: '2', question: 'Question 2', answer: 'Answer 2' },
    ],
  },
  modals: { currentModal: ModalTypes.REMOVE_ALL, modalProps: {} },
};

describe('RemoveDialog Component', () => {
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

  const renderRemoveDialog = () =>
    renderWrapper(<RemoveDialog type={ModalTypes.REMOVE_ALL} />, {
      mockData: mockInitialStore,
    });

  it('renders the dialog correctly', () => {
    renderRemoveDialog();

    expect(screen.getByText('Remove All Questions')).toBeInTheDocument();

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();

    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
    expect(screen.getByTestId('cancelButton')).toBeInTheDocument();
  });

  it('submits removal correctly for all questions', () => {
    renderRemoveDialog();

    fireEvent.click(screen.getByTestId('submitButton'));
    expect(screen.queryByTestId('submitButton')).not.toBeInTheDocument();
  });

  it('submits removal correctly for a single question', () => {
    renderWrapper(<RemoveDialog type={ModalTypes.REMOVE_QUESTION} />, {
      mockData: {
        ...mockInitialStore,
        modals: {
          ...mockInitialStore.modals,
          currentModal: ModalTypes.REMOVE_QUESTION,
        },
      },
    });

    expect(screen.getByText('Remove Question')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submitButton'));
    expect(screen.queryByTestId('submitButton')).not.toBeInTheDocument();
  });

  it('closes the modal when cancel button is clicked', () => {
    renderRemoveDialog();
    fireEvent.click(screen.getByTestId('cancelButton'));

    expect(screen.queryByTestId('cancelButton')).not.toBeInTheDocument();
  });
});
