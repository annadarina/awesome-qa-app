import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IconButton from './index';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';

describe('IconButton Component', () => {
  const onClickMock = jest.fn();

  const renderIconButton = (
    props: Partial<React.ComponentProps<typeof IconButton>> = {}
  ) =>
    render(
      <IconButton onClick={onClickMock} {...props}>
        <CloseIcon />
      </IconButton>
    );

  it('calls the onClick function when the button is clicked', () => {
    renderIconButton();

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  it('renders the provided label as aria-label', () => {
    renderIconButton({ label: 'Custom Label' });

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Custom Label');
  });
});
