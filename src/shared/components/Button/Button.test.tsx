import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './index';

describe('Button Component', () => {
  const renderButton = (
    props: Partial<React.ComponentProps<typeof Button>> = {}
  ) => render(<Button {...props}>Click</Button>);

  it('renders button with correct text', () => {
    renderButton();

    const button = screen.getByRole('button', { name: 'Click' });

    expect(button).toBeInTheDocument();
  });

  it('applies default variant class when no variant is provided', () => {
    renderButton();

    const button = screen.getByRole('button', { name: 'Click' });

    expect(button).toHaveClass('button');
  });

  it('applies variant class when variant is provided', () => {
    renderButton({ variant: 'primary' });

    const button = screen.getByRole('button', { name: 'Click' });

    expect(button).toHaveClass('button--primary');
  });

  it('applies custom className', () => {
    renderButton({ className: 'custom' });

    const button = screen.getByRole('button', { name: 'Click' });

    expect(button).toHaveClass('custom');
  });

  it('renders spinner when isLoading is true', () => {
    renderButton({ isLoading: true });

    const button = screen.getByRole('button', { name: 'Click' });

    expect(button).toContainHTML('<span class="spinner"></span>');
  });

  it('disables button when isLoading is true', () => {
    renderButton({ isLoading: true });

    const button = screen.getByRole('button', { name: 'Click' });

    expect(button).toBeDisabled();
  });

  it('does not disable button when isLoading is false', () => {
    renderButton({ isLoading: false });

    const button = screen.getByRole('button', { name: 'Click' });

    expect(button).not.toBeDisabled();
  });
});
