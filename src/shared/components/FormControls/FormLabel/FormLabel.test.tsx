import React from 'react';
import { render, screen } from '@testing-library/react';
import FormLabel from './index';

describe('FormLabel Component', () => {
  const renderFormLabel = (
    props: Partial<React.ComponentProps<typeof FormLabel>> = {}
  ) =>
    render(
      <FormLabel {...props} htmlFor="label">
        Field label
      </FormLabel>
    );

  it('renders label with correct text', () => {
    renderFormLabel();

    const label = screen.getByText('Field label');

    expect(label).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderFormLabel({ className: 'custom' });

    const label = screen.getByText('Field label');

    expect(label).toHaveClass('custom');
  });
});
