import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tooltip from './index';

const title = 'Tooltip content';

describe('Tooltip Component', () => {
  const renderTooltip = () =>
    render(
      <Tooltip title={title} className="custom">
        Hover me
      </Tooltip>
    );

  it('displays tooltip on hover with custom class name', () => {
    renderTooltip();

    expect(screen.queryByText(title)).not.toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByText('Hover me'));

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(title)).toHaveClass('custom');

    fireEvent.mouseLeave(screen.getByText('Hover me'));

    expect(screen.queryByText(title)).not.toBeInTheDocument();
  });
});
