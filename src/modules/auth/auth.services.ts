import e, { Request } from "express";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUpUser = async (req: Request) => {
  const { name, email, password, phone, role } = req.body;
  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name , email , password , phone , role) VALUES($1,$2,$3,$4,$5) RETURNING name , email , phone , role `,
    [name, email, hashedPass, phone, role]
  );
  return result;
};

const signInUser = async (req: Request) => {
  const { email, password } = req.body;

  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];

  const match = bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  const secret = `KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30`;

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    secret,
    {
      expiresIn: "1d",
    }
  );

  delete user.password;
  return { token, user };
};

export const authServices = {
  signUpUser,
  signInUser,
};
