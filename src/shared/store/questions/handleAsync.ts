import { createAsyncThunk } from '@reduxjs/toolkit';
import { Question, ModalTypes } from '../../types';
import { questionsSlice } from './questionsSlice';

const delay: (question: Question) => Promise<Question> = (data: Question) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), 5000));
};

export const submitQuestionAsync = createAsyncThunk(
  'questions/submitAsync',
  async (
    payload: { question: Question; type: ModalTypes.ADD | ModalTypes.EDIT },
    { dispatch }
  ) => {
    const { setIsLoading, addQuestion, editQuestion, resetLoading } =
      questionsSlice.actions;
    const { question, type } = payload;

    const loadingKey =
      type === ModalTypes.ADD ? 'isAddNewLoading' : 'isUpdateLoading';

    dispatch(setIsLoading(loadingKey));

    const data = await delay(question);

    if (type === ModalTypes.ADD) {
      dispatch(addQuestion(data));
    }

    if (type === ModalTypes.EDIT) {
      dispatch(editQuestion(data));
    }

    dispatch(resetLoading());
  }
);
