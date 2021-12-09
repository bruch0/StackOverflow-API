interface Question {
  userId: number;
  userClassId: number;
  question: string;
  tags: string;
  submitionDate: string;
  answer: any;
  answerDate: string;
  answerUserId: number;
  score: number;
}

export { Question };
