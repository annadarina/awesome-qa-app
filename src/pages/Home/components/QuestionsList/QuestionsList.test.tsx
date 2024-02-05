import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuestionsList from './index';
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

describe('QuestionsList Component', () => {
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

  it('renders with no questions', () => {
    const mockInitialStore = {
      questions: {
        isUpdateLoading: false,
        isAddNewLoading: false,
        questions: [],
      },
      modals: { currentModal: null, modalProps: {} },
    };
    renderWrapper(<QuestionsList />, { mockData: mockInitialStore });

    const placeholderMessage = screen.getByText(
      'No questions yet. Please add your first question'
    );
    expect(placeholderMessage).toBeInTheDocument();
  });

  it('renders with multiple questions', () => {
    renderWrapper(<QuestionsList />, { mockData: mockInitialStore });

    const questionCards = screen.getAllByTestId('card');
    expect(questionCards.length).toBe(2);
  });

  it('fires correct actions when removing a question', async () => {
    renderWrapper(<QuestionsList />, { mockData: mockInitialStore });

    const cardHeaders = screen.getAllByRole('heading', { level: 3 });
    const firstCardHeader = cardHeaders[0];

    const user = userEvent.setup();

    await act(async () => {
      await user.click(firstCardHeader);
    });

    const removeButton = screen.getAllByLabelText('removeButton');

    await act(async () => {
      await user.click(removeButton[0]);
    });

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    const submitButton = screen.getByTestId('submitButton');
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      await user.click(screen.getByText('Submit'));
    });

    expect(submitButton).not.toBeInTheDocument();
    expect(screen.queryAllByTestId('card')).toHaveLength(1);
  });

  it('fires correct actions when editing a question', async () => {
    renderWrapper(<QuestionsList />, { mockData: mockInitialStore });

    const cardHeaders = screen.getAllByRole('heading', { level: 3 });
    const firstCardHeader = cardHeaders[0];

    const user = userEvent.setup();

    await act(async () => {
      await user.click(firstCardHeader);
    });

    const editButton = screen.getAllByLabelText('editButton');

    await act(async () => {
      await user.click(editButton[0]);
    });

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();

    const submitButton = screen.getByTestId('submitButton');
    expect(submitButton).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(
        screen.getByLabelText('Question'),
        'Custom Question'
      );
      await user.click(screen.getByText('Submit'));
    });

    expect(submitButton).not.toBeInTheDocument();
    expect(firstCardHeader).toHaveTextContent('Custom Question');
  });
});
