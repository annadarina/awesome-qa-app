import React from 'react';
import { render, screen } from '@testing-library/react';
import AppHeader from './index';

describe('AppHeader Component', () => {
  it('renders header with correct title', () => {
    render(<AppHeader />);

    const heading = screen.getByRole('heading', { name: 'Awesome Q&A App' });

    expect(heading).toBeInTheDocument();
  });

  it('renders children elements', () => {
    render(
      <AppHeader>
        <button>Click</button>
      </AppHeader>
    );

    const child = screen.getByRole('button', { name: 'Click' });

    expect(child).toBeInTheDocument();
  });
});
