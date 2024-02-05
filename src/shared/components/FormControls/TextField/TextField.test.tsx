import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from './index';

describe('TextField Component', () => {
  const renderTextField = (
    props: Partial<React.ComponentProps<typeof TextField>> = {}
  ) => render(<TextField {...props} />);

  it('renders textfield element', () => {
    renderTextField();

    const textfield = screen.getByRole('textbox');

    expect(textfield).toBeInTheDocument();
  });

  it('passes props correctly', () => {
    renderTextField({ placeholder: 'Add question' });

    const textfield = screen.getByPlaceholderText('Add question');

    expect(textfield).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = jest.fn();
    renderTextField({ onChange: handleChange });

    const textfield = screen.getByRole('textbox');

    userEvent.type(textfield, 'Hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
