import connection from '../database/database';

const getUserClassById = async (classId: number) => {
  const className = await connection.query(
    'SELECT * FROM classes WHERE id = $1',
    [classId]
  );

  return className.rows[0].name;
};

export { getUserClassById };
