import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header Component', () => {
  const renderHeader = (
    props: Partial<React.ComponentProps<typeof Header>> = {}
  ) => render(<Header {...props}>Hello World!</Header>);

  it('renders with default h6 tag', () => {
    renderHeader();

    const header = screen.getByText('Hello World!');

    expect(header).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
  });

  it('renders with custom tag', () => {
    renderHeader({ as: 'h2' });

    const header = screen.getByText('Hello World!');

    expect(header).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
