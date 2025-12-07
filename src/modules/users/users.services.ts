import { pool } from "../../config/db";

const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return result;
};

const deleteUser = async (id : string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1` , [id]) ;
  
  return result
}

export const usersServices = {
  getUsers,
  getSingleUser,
  deleteUser
};
