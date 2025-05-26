import pool from "../config/db.js";

const getDropdown = async (userId) => {
  const [rows] = await pool.query("CALL spGetDropdown(?)", [userId]);
  return rows[0];
};

const getStatistics = async (userId) => {
  const [rows] = await pool.query("CALL spGetUserExpenseStatistics(?)", [
    userId,
  ]);
  return {
    Statistic1: rows[0],
    Statistic2: rows[1],
    Statistic3: rows[2],
  };
};

export default { getDropdown, getStatistics };
