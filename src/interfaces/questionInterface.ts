interface QuestionOnRepository {
  userId: number;
  userClassId: number;
  question: string;
  tags: string;
  submitionDate: string;
}

interface QuestionOnService {
  userToken: string;
  question: string;
  tags: string;
}

export { QuestionOnRepository, QuestionOnService };
