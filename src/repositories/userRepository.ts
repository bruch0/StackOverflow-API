import connection from '../database/database';

const createUser = async ({ string: username }) => {
  await connection.query('INSERT INTO users (name) VALUES ($1)', [username]);
};

export { createUser };
