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

export { QuestionDB, Question, Answer };
