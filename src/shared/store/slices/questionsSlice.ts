import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../../types';

interface QuestionsState {
  questions: Question[];
  isLoading: boolean;
}

const initialState: QuestionsState = {
  questions: [],
  isLoading: false,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion(state, action: PayloadAction<Omit<Question, 'id'>>) {
      const newQuestion = {
        id: uuidv4(),
        ...action.payload,
      };
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
  },
});

export const { addQuestion, sortQuestions, removeAllQuestions } =
  questionsSlice.actions;

export default questionsSlice.reducer;
