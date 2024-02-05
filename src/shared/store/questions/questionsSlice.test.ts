import {
  addQuestion,
  sortQuestions,
  removeAllQuestions,
  removeQuestion,
  editQuestion,
  questionsSlice,
  setIsLoading,
  resetLoading,
} from './questionsSlice';

describe('questionsSlice', () => {
  const mockInitialState = {
    questions: [],
    isAddNewLoading: false,
    isUpdateLoading: false,
  };

  it('should add a new question', () => {
    const question = {
      id: '1',
      question: 'Test question',
      answer: 'Test answer',
    };
    const nextState = questionsSlice.reducer(
      mockInitialState,
      addQuestion(question)
    );
    expect(nextState.questions).toHaveLength(1);
    expect(nextState.questions[0]).toHaveProperty('question', 'Test question');
    expect(nextState.questions[0]).toHaveProperty('answer', 'Test answer');
  });

  it('should sort questions alphabetically', () => {
    const state = {
      ...mockInitialState,
      questions: [
        { id: '1', question: 'Banana', answer: '' },
        { id: '2', question: 'Apple', answer: '' },
      ],
    };
    const nextState = questionsSlice.reducer(state, sortQuestions());
    expect(nextState.questions[0].question).toBe('Apple');
    expect(nextState.questions[1].question).toBe('Banana');
  });

  it('should remove all questions', () => {
    const state = {
      ...mockInitialState,
      questions: [{ id: '1', question: 'Test', answer: '' }],
    };
    const nextState = questionsSlice.reducer(state, removeAllQuestions());
    expect(nextState.questions).toHaveLength(0);
  });

  it('should remove question by id', () => {
    const state = {
      ...mockInitialState,
      questions: [
        { id: '1', question: 'First Question', answer: '' },
        { id: '2', question: 'Second question', answer: '' },
      ],
    };
    const nextState = questionsSlice.reducer(state, removeQuestion('1'));
    const missingItem = nextState.questions.some((item) => item.id !== '1');
    expect(missingItem).toBe(true);
    expect(nextState.questions).toHaveLength(1);
  });

  it('should edit question', () => {
    const updatedQuestion = {
      id: '1',
      question: 'First Question Changed',
      answer: 'Hello World',
    };
    const state = {
      ...mockInitialState,
      questions: [
        { id: '1', question: 'First Question', answer: '' },
        { id: '2', question: 'Second question', answer: '' },
      ],
    };
    const nextState = questionsSlice.reducer(
      state,
      editQuestion(updatedQuestion)
    );
    const updatedItem = nextState.questions.some(
      (item) =>
        item.question === 'First Question Changed' &&
        item.answer === 'Hello World'
    );
    expect(updatedItem).toBe(true);
    expect(nextState.questions).toHaveLength(2);
    expect(nextState.questions).toHaveLength(2);
  });

  it('should set isLoading state to true', () => {
    const state = { ...mockInitialState };
    const nextState = questionsSlice.reducer(
      state,
      setIsLoading('isAddNewLoading')
    );
    expect(nextState.isAddNewLoading).toBe(true);
  });

  it('should reset loading states', () => {
    const state = { ...mockInitialState, isUpdateLoading: true };
    const nextState = questionsSlice.reducer(state, resetLoading());
    expect(nextState.isUpdateLoading).toBe(false);
  });
});
