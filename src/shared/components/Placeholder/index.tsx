import React from 'react';
import { ReactComponent as InfoIcon } from '../../assets/info.svg';
import './Placeholder.css';

interface Props {
  message: string;
  status?: 'error' | 'warning' | 'info';
  icon?: React.ReactElement;
  className?: string;
}

const Placeholder = ({
  className = '',
  message,
  status = 'info',
  icon = <InfoIcon />,
}: Props) => {
  const statusClassName = `placeholder--${status}`;

  return (
    <div className={`placeholder ${className} ${statusClassName}`}>
      <div className="placeholder__icon">{icon}</div>
      <div className="placeholder__message">{message}</div>
    </div>
  );
};

export default Placeholder;
