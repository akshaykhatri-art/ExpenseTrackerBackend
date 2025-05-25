import pool from "../config/db.js";

const getDropdown = async (userId) => {
  const [rows] = await pool.query("CALL spGetDropdown(?)", [userId]);
  return rows[0];
};

export default { getDropdown };
