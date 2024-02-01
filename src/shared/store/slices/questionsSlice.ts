import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addQuestion(state, action: PayloadAction<Question>) {
      state.questions = [action.payload, ...state.questions];
    },
    sortQuestions(state) {
      state.questions = state.questions.sort((a, b) =>
        a.question.localeCompare(b.question)
      );
    },
    removeAllQuestions(state) {
      state.questions = [];
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
} = questionsSlice.actions;

export default questionsSlice.reducer;
