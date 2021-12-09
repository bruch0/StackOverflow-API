import connection from '../database/database';

const regiserUserToken = async (userId: number, token: string) => {
  await connection.query(
    'INSERT INTO user_tokens (user_id, token) VALUES ($1, $2)',
    [userId, token]
  );
};

export { regiserUserToken };
