import connection from '../database/database';

import { QuestionDB } from '../interfaces/questionInterface';

const registerQuestion = async (questionInfo: QuestionDB) => {
  const { userId, userClassId, question, tags, submitionDate } = questionInfo;

  const questionId = await connection.query(
    'INSERT INTO questions (user_id, user_class_id, question, tags, submition_date, answer, score) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    [userId, userClassId, question, tags, submitionDate, '', 1]
  );

  return questionId.rows[0].id;
};

const checkQuestionIsAlreadyAnswered = async (
  questionId: number
): Promise<{ isAlreadyAnswered: boolean; score: number }> => {
  const question = await connection.query(
    `SELECT * FROM questions WHERE id = $1`,
    [questionId]
  );

  return {
    isAlreadyAnswered: Boolean(question.rows[0].answer),
    score: question.rows[0].score,
  };
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

const getQuestion = async (questionId: number) => {
  const question = await connection.query(
    'SELECT * FROM questions WHERE id = $1',
    [questionId]
  );

  if (!question) return false;

  return question.rows[0];
};

const getAllUnansweredQuestions = async () => {
  const questions = await connection.query(
    `SELECT * FROM questions WHERE answer = ''`
  );

  return questions.rows;
};

const updateQuestionScore = async (questionId: number, operation: string) => {
  const user = await connection.query(
    `UPDATE questions SET score = score ${operation} 1 WHERE id = $1 RETURNING *`,
    [questionId]
  );

  return user.rows[0];
};

export {
  registerQuestion,
  checkQuestionIsAlreadyAnswered,
  answerQuestion,
  getQuestion,
  getAllUnansweredQuestions,
  updateQuestionScore,
};
