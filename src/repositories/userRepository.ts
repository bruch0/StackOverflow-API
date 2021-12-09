import connection from '../database/database';

const createUser = async ({ string: username, number: classId }) => {
  await connection.query(
    'INSERT INTO users (name, class_id, answers, total_score) VALUES ($1, $2, 0, 0)',
    [username, classId]
  );
};

export { createUser };
