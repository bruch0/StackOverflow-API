import connection from '../database/database';

import { Question } from '../interfaces/questionInterface';

const registerQuestion = async (questionInfo: Question) => {
  const { userId, userClassId, question, tags, submitionDate } = questionInfo;

  await connection.query(
    'INSERT INTO questions (user_id, user_class_id, question, tags, submition_date, answer, score) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [userId, userClassId, question, tags, submitionDate, '', 0]
  );
};

export { registerQuestion };
