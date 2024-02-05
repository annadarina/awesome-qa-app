import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import QuestionDialog from './index';
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
  modals: { currentModal: ModalTypes.ADD, modalProps: {} },
};

describe('QuestionDialog Component', () => {
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

  const renderQuestionDialog = () =>
    renderWrapper(<QuestionDialog type={ModalTypes.ADD} />, {
      mockData: mockInitialStore,
    });

  it('renders the dialog correctly', () => {
    renderQuestionDialog();

    expect(screen.getByText('Add Question')).toBeInTheDocument();

    expect(screen.getByLabelText('Question')).toBeInTheDocument();
    expect(screen.getByLabelText('Answer')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Add with 5 seconds delay')
    ).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
    expect(screen.getByTestId('cancelButton')).toBeInTheDocument();
  });

  it('closes the modal when cancel button is clicked', () => {
    renderQuestionDialog();

    fireEvent.click(screen.getByTestId('cancelButton'));
    expect(screen.queryByTestId('cancelButton')).not.toBeInTheDocument();
  });
});
