import React from 'react';
import './AppHeader.css';
import Button from '../Button';
import Header from '../Header';

interface Props {
  onAdd: () => void;
  onSortAll: () => void;
  onRemoveAll: () => void;
}

const AppHeader: React.FC<Props> = ({ onAdd, onRemoveAll, onSortAll }) => {
  return (
    <header className="app-header">
      <div className="app-header__wrapper">
        <Header as="h1">Awesome Q&A App</Header>
        <div className="app-header__actions">
          <Button onClick={onAdd}>Add new</Button>
          <Button onClick={onSortAll} variant="primary">
            Sort all
          </Button>
          <Button onClick={onRemoveAll} variant="danger">
            Remove all
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
