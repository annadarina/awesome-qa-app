import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../../types';

export interface QuestionsState {
  questions: Question[];
  isAddNewLoading: boolean;
  isUpdateLoading: boolean;
}

const initialState: QuestionsState = {
  questions: [],
  isAddNewLoading: false,
  isUpdateLoading: false,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setIsLoading(
      state,
      action: PayloadAction<'isAddNewLoading' | 'isUpdateLoading'>
    ) {
      const key = action.payload;
      state[key] = true;
    },
    addQuestion(state, action: PayloadAction<Question>) {
      const newQuestion = { ...action.payload, id: uuidv4() };
      state.questions = [newQuestion, ...state.questions];
    },
    sortQuestions(state) {
      state.questions = state.questions.sort((a, b) =>
        a.question.localeCompare(b.question)
      );
    },
    removeAllQuestions(state) {
      state.questions = [];
    },
    resetLoading(state) {
      state.isAddNewLoading = false;
      state.isUpdateLoading = false;
    },
    removeQuestion(state, action: PayloadAction<string>) {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      );
    },
    editQuestion(state, action: PayloadAction<Question>) {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          return { ...action.payload };
        }
        return question;
      });
    },
  },
});

export const {
  addQuestion,
  sortQuestions,
  removeAllQuestions,
  removeQuestion,
  editQuestion,
  resetLoading,
} = questionsSlice.actions;

export default questionsSlice.reducer;
