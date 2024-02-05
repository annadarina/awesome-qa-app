import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextArea from './index';

describe('TextArea Component', () => {
  const renderTextArea = (
    props: Partial<React.ComponentProps<typeof TextArea>> = {}
  ) => render(<TextArea {...props} />);

  it('renders textarea element', () => {
    renderTextArea();

    const textarea = screen.getByRole('textbox');

    expect(textarea).toBeInTheDocument();
  });

  it('passes props correctly', () => {
    renderTextArea({ placeholder: 'Add answer' });

    const textarea = screen.getByPlaceholderText('Add answer');

    expect(textarea).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    const handleChange = jest.fn();
    renderTextArea({ onChange: handleChange });

    const textarea = screen.getByRole('textbox');

    userEvent.type(textarea, 'Hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });
});
