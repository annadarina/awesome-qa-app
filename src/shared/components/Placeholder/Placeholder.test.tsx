import React from 'react';
import { render, screen } from '@testing-library/react';
import Placeholder from './index';

describe('Placeholder Component', () => {
  const renderPlaceholder = (
    props: Partial<React.ComponentProps<typeof Placeholder>> = {}
  ) => render(<Placeholder message="Default message" {...props} />);

  it('renders correctly with default props', () => {
    renderPlaceholder();
    const messageElement = screen.getByText('Default message');
    expect(messageElement).toBeInTheDocument();
  });

  it('renders correctly with specified status', () => {
    renderPlaceholder({ status: 'warning' });
    const placeholderElement = screen.getByTestId('placeholder');
    expect(placeholderElement).toHaveClass('placeholder--warning');
  });

  it('applies custom className', () => {
    renderPlaceholder({ className: 'custom' });
    const placeholderElement = screen.getByTestId('placeholder');
    expect(placeholderElement).toHaveClass('custom');
  });
});
