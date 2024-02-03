export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface QuestionFormData {
  question: Question;
  isAsync: boolean;
}
