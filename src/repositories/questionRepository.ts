import connection from '../database/database';

import { QuestionOnRepository } from '../interfaces/questionInterface';

const registerQuestion = async (questionInfo: QuestionOnRepository) => {
  const { userId, userClassId, question, tags, submitionDate } = questionInfo;

  const questionId = await connection.query(
    'INSERT INTO questions (user_id, user_class_id, question, tags, submition_date, answer, score) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    [userId, userClassId, question, tags, submitionDate, '', 0]
  );

  return questionId.rows[0].id;
};

export { registerQuestion };
