import React from 'react';
import { screen, act } from '@testing-library/react';
import Home from './index';
import { renderWrapper } from 'shared/utils';
import userEvent from '@testing-library/user-event';

const mockInitialStore = {
  questions: {
    isUpdateLoading: false,
    isAddNewLoading: false,
    questions: [
      { id: '1', question: 'Banana', answer: 'Answer 1' },
      { id: '2', question: 'Apple', answer: 'Answer 2' },
    ],
  },
  modals: { currentModal: null, modalProps: {} },
};

describe('Home Page', () => {
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

  const renderHomePage = () =>
    renderWrapper(<Home />, { mockData: mockInitialStore });

  it('dispatches correct actions when buttons are clicked', async () => {
    renderHomePage();

    const user = userEvent.setup();

    const addButton = screen.getByText('Add new');
    const sortAll = screen.getByText('Sort all');
    const removeAll = screen.getByText('Remove all');
    const toggleTheme = screen.getByLabelText('Toggle Theme');

    expect(addButton).toBeInTheDocument();
    expect(sortAll).toBeInTheDocument();
    expect(removeAll).toBeInTheDocument();
    expect(toggleTheme).toBeInTheDocument();

    // Test sort all
    await act(async () => {
      await user.click(sortAll);
    });
    const cardHeaders = screen.getAllByRole('heading', { level: 3 });
    expect(cardHeaders[0]).toHaveTextContent('Apple');

    // Test Add new question
    await act(async () => {
      await user.click(addButton);
    });
    expect(screen.getByText('Add Question')).toBeInTheDocument();
    await act(async () => {
      await userEvent.type(screen.getByLabelText('Question'), 'Test question');
      await userEvent.type(screen.getByLabelText('Answer'), 'Test answer');
      await user.click(screen.getByText('Submit'));
    });

    expect(screen.getAllByTestId('card')).toHaveLength(3);

    // Test remove all
    await act(async () => {
      await user.click(removeAll);
    });
    expect(screen.getByText('Remove All Questions')).toBeInTheDocument();
    await act(async () => {
      await user.click(screen.getByText('Submit'));
    });
    expect(screen.queryAllByTestId('card')).toHaveLength(0);

    // Test toggle theme
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveClass('theme-light');
    await user.click(toggleTheme);
    expect(layout).toHaveClass('theme-dark');
  });
});
