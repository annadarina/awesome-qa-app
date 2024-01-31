import React, { useState } from 'react';
import Header from 'shared/components/Header';
import QuestionsList from '../QuestionsList';
import QuestionDialog from '../../shared/components/QuestionDialog';
import './Home.css';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout">
      <Header
        onAdd={() => setIsOpen(true)}
        onRemoveAll={() => {}}
        onSortAll={() => {}}
      />

      <main className="layout__content">
        <QuestionsList />
      </main>

      <QuestionDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type="add"
        selectedQuestion={{ id: '1', answer: '', question: '' }}
      />
    </div>
  );
};

export default Home;
