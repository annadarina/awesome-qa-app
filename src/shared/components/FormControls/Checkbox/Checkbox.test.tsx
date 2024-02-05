import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from './index';

describe('Checkbox Component', () => {
  const renderCheckbox = (
    props: Partial<React.ComponentProps<typeof Checkbox>> = {}
  ) => render(<Checkbox {...props} label="Add with delay" />);

  it('renders checkbox with correct label', () => {
    renderCheckbox();

    const checkbox = screen.getByRole('checkbox', { name: 'Add with delay' });

    expect(checkbox).toBeInTheDocument();
  });

  it('applies disabled class when disabled prop is true', () => {
    renderCheckbox({ disabled: true });

    const container = screen.getByTestId('checkboxContainer');

    expect(container).toHaveClass('container--disabled');
  });
});
