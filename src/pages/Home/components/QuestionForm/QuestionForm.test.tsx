import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionForm from './index';
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
  modals: { currentModal: null, modalProps: {} },
};

describe('QuestionForm Component', () => {
  const handleSubmit = jest.fn();
  const handleCancel = jest.fn();

  beforeEach(() => {
    handleSubmit.mockClear();
    handleCancel.mockClear();
  });

  const rednderQuestionForm = () =>
    renderWrapper(
      <QuestionForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={false}
      />,
      { mockData: mockInitialStore }
    );

  it('renders form fields and buttons correctly', () => {
    rednderQuestionForm();

    expect(screen.getByLabelText('Question')).toBeInTheDocument();
    expect(screen.getByLabelText('Answer')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Add with 5 seconds delay')
    ).toBeInTheDocument();

    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
    expect(screen.getByTestId('cancelButton')).toBeInTheDocument();
  });

  it('handles input change correctly', async () => {
    rednderQuestionForm();

    const user = userEvent.setup();

    await act(async () => {
      await userEvent.type(screen.getByLabelText('Question'), 'Test question');
      await userEvent.type(screen.getByLabelText('Answer'), 'Test answer');
      await user.click(screen.getByText('Submit'));
    });

    expect(screen.getByLabelText('Question')).toHaveValue('Test question');
    expect(screen.getByLabelText('Answer')).toHaveValue('Test answer');
  });

  it('handles checkbox change correctly', () => {
    rednderQuestionForm();

    expect(screen.getByLabelText('Add with 5 seconds delay')).not.toBeChecked();

    fireEvent.click(screen.getByLabelText('Add with 5 seconds delay'));

    expect(screen.getByLabelText('Add with 5 seconds delay')).toBeChecked();
  });

  it('submits form with correct data', async () => {
    rednderQuestionForm();

    const user = userEvent.setup();

    await act(async () => {
      await userEvent.type(screen.getByLabelText('Question'), 'Test question');
      await userEvent.type(screen.getByLabelText('Answer'), 'Test answer');
      await userEvent.click(screen.getByLabelText('Add with 5 seconds delay'));
      await user.click(screen.getByText('Submit'));
    });

    expect(handleSubmit).toHaveBeenCalledWith({
      question: { question: 'Test question', answer: 'Test answer', id: '' },
      isAsync: true,
    });
  });

  it('calls onCancel when cancel button is clicked', async () => {
    rednderQuestionForm();

    const user = userEvent.setup();

    await act(async () => {
      await user.click(screen.getByTestId('cancelButton'));
    });

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
