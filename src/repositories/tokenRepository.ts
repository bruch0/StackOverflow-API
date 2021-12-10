import connection from '../database/database';

const regiserUserToken = async (userId: number, token: string) => {
  await connection.query(
    'INSERT INTO user_tokens (user_id, token) VALUES ($1, $2)',
    [userId, token]
  );
};

const getUserInfoByToken = async (userToken: string) => {
  const user = await connection.query(
    'SELECT * FROM user_tokens WHERE token = $1',
    [userToken]
  );

  if (!user.rowCount) return false;

  const userId = user.rows[0].user_id;

  const userInfo = await connection.query('SELECT * FROM users WHERE id = $1', [
    userId,
  ]);

  if (!userInfo) return false;

  const userClassId = userInfo.rows[0].class_id;

  return { userId, userClassId };
};

export { regiserUserToken, getUserInfoByToken };
