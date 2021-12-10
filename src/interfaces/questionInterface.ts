interface Question {
  userToken?: string;
  question: string;
  tags: string;
}

interface QuestionDB extends Question {
  userId: number;
  userClassId: number;
  submitionDate: string;
}

interface Answer {
  userToken: string;
  answer: string;
  questionId: number;
}

interface QuestionInfo {
  id: number;
  question: string;
  student: string;
  class: string;
  submitAt: string;
  answered: boolean;
  answeredAt?: string;
  answer?: string;
  answeredBy?: string;
}

export { QuestionDB, Question, Answer, QuestionInfo };
