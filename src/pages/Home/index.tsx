import React from 'react';
import AppHeader from 'shared/components/AppHeader';
import QuestionsList from './components/QuestionsList';
import RemoveDialog from './components/RemoveDialog';
import { ReactComponent as ThemeIcon } from 'shared/assets/theme.svg';
import './Home.css';
import { useAppDispatch } from 'shared/store/hooks';
import { sortQuestions } from 'shared/store/questions/questionsSlice';
import { showModal } from 'shared/store/modals/modalsSlice';
import QuestionDialog from './components/QuestionDialog';
import { ModalTypes } from 'shared/types';
import { useTheme } from 'shared/context/ThemeProvider';
import Button from 'shared/components/Button';
import IconButton from 'shared/components/IconButton';

const Home = () => {
  const dispatch = useAppDispatch();
  const { toggleTheme } = useTheme();

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
    <>
      <AppHeader>
        <div className="header-actions">
          <Button onClick={handleAdd}>Add new</Button>
          <Button onClick={handleSortAll} variant="primary">
            Sort all
          </Button>
          <Button onClick={handleRemoveAll} variant="danger">
            Remove all
          </Button>
          <IconButton
            className="header-actions__theme"
            label="Toggle Theme"
            onClick={toggleTheme}
          >
            <ThemeIcon />
          </IconButton>
        </div>
      </AppHeader>

      <main className="layout__content">
        <QuestionsList />
      </main>

      <QuestionDialog type={ModalTypes.ADD} />
      <RemoveDialog type={ModalTypes.REMOVE_ALL} />
    </>
  );
};

export default Home;
