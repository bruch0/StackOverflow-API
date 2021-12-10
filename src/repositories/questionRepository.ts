import connection from '../database/database';

import { QuestionDB } from '../interfaces/questionInterface';

const registerQuestion = async (questionInfo: QuestionDB) => {
  const { userId, userClassId, question, tags, submitionDate } = questionInfo;

  const questionId = await connection.query(
    'INSERT INTO questions (user_id, user_class_id, question, tags, submition_date, answer, score) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    [userId, userClassId, question, tags, submitionDate, '', 0]
  );

  return questionId.rows[0].id;
};

const checkQuestionIsAlreadyAnswered = async (
  questionId: number
): Promise<Boolean> => {
  const question = await connection.query(
    `SELECT * FROM questions WHERE id = $1 AND answer != ''`,
    [questionId]
  );

  return Boolean(question.rowCount);
};

const answerQuestion = async (
  questionId: number,
  answer: string,
  answerDate: string,
  userId: number
) => {
  await connection.query(
    'UPDATE questions SET answer = $1, answer_date = $2, user_answer_id = $3 WHERE id = $4',
    [answer, answerDate, userId, questionId]
  );
};

export { registerQuestion, checkQuestionIsAlreadyAnswered, answerQuestion };
