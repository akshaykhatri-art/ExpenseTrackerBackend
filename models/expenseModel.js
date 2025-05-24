import pool from "../config/db.js";

const getAll = async (userId) => {
  const [rows] = await pool.query("CALL spGetExpenseList(?)", [userId]);
  return rows[0];
};

const getById = async (expenseId, userId) => {
  const [rows] = await pool.query("CALL spGetExpenseById(?, ?)", [
    expenseId,
    userId,
  ]);
  return rows[0][0];
};

const add = async (data) => {
  const [rows] = await pool.query("CALL spAddUpdateExpense(?,?,?,?,?,?)", [
    null,
    data.categoryId,
    data.amount,
    data.date,
    data.description,
    data.CurrentUser,
  ]);
  const result = rows[0][0];
  return result;
};

const update = async (data) => {
  const [rows] = await pool.query("CALL spAddUpdateExpense(?,?,?,?,?,?)", [
    data.expenseId,
    data.categoryId,
    data.amount,
    data.date,
    data.description,
    data.CurrentUser,
  ]);
  const result = rows[0][0];
  return result;
};

const remove = async (expenseId, userId) => {
  const [resultSets] = await pool.query("CALL spInactiveExpenseById(?, ?)", [
    expenseId,
    userId,
  ]);

  const result = resultSets[0]?.[0];

  return {
    success: result?.success === 1,
    message: result?.message || "Unknown response from database",
  };
};

export default { getAll, getById, add, update, remove };
