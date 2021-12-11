import connection from '../database/database';

import { User } from '../interfaces/userInterface';

const createUser = async (userInfo: User) => {
  const user = await connection.query(
    'INSERT INTO users (name, class_id, answers, total_score) VALUES ($1, $2, 0, 0) returning id',
    [userInfo.name, userInfo.classId]
  );

  return user.rows[0].id;
};

const getUsernameById = async (userId: number) => {
  const user = await connection.query('SELECT * FROM users WHERE id = $1', [
    userId,
  ]);

  return user.rows[0].name;
};

const getAllUsers = async () => {
  const users = await connection.query('SELECT * FROM users');

  return users.rows;
};

const updateUserScore = async (
  userId: number,
  operation: string,
  add: number
) => {
  await connection.query(
    `UPDATE users SET total_score = total_score ${operation} ${add} WHERE id = $1`,
    [userId]
  );
};

const updateUserAnsweredQuestions = async (userId: number) => {
  await connection.query(
    `UPDATE users SET answers = answers + 1 WHERE id = $1`,
    [userId]
  );
};

export {
  createUser,
  getUsernameById,
  getAllUsers,
  updateUserScore,
  updateUserAnsweredQuestions,
};
