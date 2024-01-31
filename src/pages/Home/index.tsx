import React from 'react';
import Header from 'shared/components/Header';
import './Home.css';
import QuestionsList from '../QuestionsList';

const Home = () => {
  return (
    <div className="layout">
      <Header onAdd={() => {}} onRemoveAll={() => {}} onSortAll={() => {}} />

      <main className="layout__content">
        <QuestionsList />
      </main>
    </div>
  );
};

export default Home;
