import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuestionCard from './';
import userEvent from '@testing-library/user-event';

describe('QuestionCard Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnRemove = jest.fn();

  const question = {
    id: '1',
    question: 'Test question',
    answer: 'Test answer',
  };

  const renderQuestionCard = () =>
    render(
      <QuestionCard
        question={question}
        onEdit={mockOnEdit}
        onRemove={mockOnRemove}
      />
    );

  it('renders question and answer correctly', () => {
    renderQuestionCard();

    const cardHeader = screen.getByTestId('cardHeader');
    const cardBody = screen.getByTestId('cardBody');

    expect(screen.getByText('Test question')).toBeInTheDocument();
    expect(cardBody).not.toHaveClass('question-card__content-wrapper--show');

    fireEvent.click(cardHeader);

    expect(screen.getByText('Test answer')).toBeInTheDocument();
  });

  it('calls onEdit callback when edit button is clicked', () => {
    renderQuestionCard();

    const cardHeader = screen.getByTestId('cardHeader');
    fireEvent.click(cardHeader);

    const editButton = screen.getByLabelText('editButton');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('calls onRemove callback when remove button is clicked', () => {
    renderQuestionCard();

    const cardHeader = screen.getByTestId('cardHeader');
    fireEvent.click(cardHeader);

    const removeButton = screen.getByLabelText('removeButton');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalled();
  });

  it('toggles answer visibility on Enter key press', () => {
    renderQuestionCard();

    const title = screen.getByRole('heading');
    const cardBody = screen.getByTestId('cardBody');

    title.focus();
    userEvent.tab();

    fireEvent.keyDown(title, { key: 'Enter' });

    expect(screen.getByText('Test answer')).toBeVisible();
    expect(cardBody).toHaveClass('question-card__content-wrapper--show');
  });
});
