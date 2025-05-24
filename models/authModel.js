import pool from "../config/db.js";

const register = async (data) => {
  const [rows] = await pool.query("CALL spRegisterUser(?,?,?,?)", [
    data.firstName,
    data.lastName,
    data.email,
    data.password,
  ]);
  return rows;
};

const login = async (email) => {
  const [rows] = await pool.query("CALL spLoginUser(?)", [email]);
  return rows[0][0];
};

export default { register, login };
