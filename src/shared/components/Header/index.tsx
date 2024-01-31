import React from 'react';
import './Header.css';
import Button from '../Button';

interface Props {
  onAdd: () => void;
  onSortAll: () => void;
  onRemoveAll: () => void;
}

const Header: React.FC<Props> = ({ onAdd, onRemoveAll, onSortAll }) => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">Awesome Q&A App</h1>
        <div className="header__actions">
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

export default Header;
