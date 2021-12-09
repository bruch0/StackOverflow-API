import connection from '../database/database';

import { User } from '../interfaces/userInterface';

const createUser = async (userInfo: User) => {
  const user = await connection.query(
    'INSERT INTO users (name, class_id, answers, total_score) VALUES ($1, $2, 0, 0) returning id',
    [userInfo.name, userInfo.classId]
  );

  return user.rows[0].id;
};

export { createUser };
