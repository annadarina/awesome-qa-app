import React from 'react';
import './AppHeader.css';
import Header from '../Header';

interface Props {
  children?: React.ReactNode;
}

const AppHeader: React.FC<Props> = ({ children }) => {
  return (
    <header className="app-header">
      <div className="app-header__wrapper">
        <Header as="h1">Awesome Q&A App</Header>
        {children}
      </div>
    </header>
  );
};

export default AppHeader;
