import React from 'react';
import AppHeader from 'shared/components/AppHeader';
import QuestionsList from './components/QuestionsList';
import RemoveDialog from './components/RemoveDialog';
import './Home.css';
import { useAppDispatch } from 'shared/store/hooks';
import { sortQuestions } from 'shared/store/questions/questionsSlice';
import { showModal } from 'shared/store/modals/modalsSlice';
import QuestionDialog from './components/QuestionDialog';
import { ModalTypes } from 'shared/types';

const Home = () => {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(showModal({ modalType: ModalTypes.ADD }));
  };

  const handleSortAll = () => {
    dispatch(sortQuestions());
  };

  const handleRemoveAll = () => {
    dispatch(showModal({ modalType: ModalTypes.REMOVE_ALL }));
  };

  return (
    <div className="layout">
      <AppHeader
        onAdd={handleAdd}
        onRemoveAll={handleRemoveAll}
        onSortAll={handleSortAll}
      />

      <main className="layout__content">
        <QuestionsList />
      </main>

      <QuestionDialog type={ModalTypes.ADD} />
      <RemoveDialog type={ModalTypes.REMOVE_ALL} />
    </div>
  );
};

export default Home;
