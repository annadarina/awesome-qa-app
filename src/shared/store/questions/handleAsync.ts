import { createAsyncThunk } from '@reduxjs/toolkit';
import { Question } from '../../types';
import { questionsSlice } from './questionsSlice';

const delay: (question: Question) => Promise<Question> = (data: Question) => {
  return new Promise((resolve) => setTimeout(() => resolve(data), 2000));
};

export const submitQuestionAsync = createAsyncThunk(
  'questions/submitAsync',
  async (
    payload: { question: Question; type: 'add' | 'edit' },
    { dispatch }
  ) => {
    const { setIsLoading, addQuestion, editQuestion } = questionsSlice.actions;
    const { question, type } = payload;

    dispatch(setIsLoading(true));

    const data = await delay(question);

    if (type === 'add') {
      dispatch(addQuestion(data));
    }

    if (type === 'edit') {
      dispatch(editQuestion(data));
    }

    dispatch(setIsLoading(false));
  }
);
