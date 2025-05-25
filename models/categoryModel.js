import pool from "../config/db.js";

const getAll = async (userId) => {
  const [rows] = await pool.query("CALL spGetCategoryList(?)", [userId]);
  return rows[0];
};

const getById = async (categoryId, userId) => {
  const [rows] = await pool.query("CALL spGetCategoryById(?, ?)", [
    categoryId,
    userId,
  ]);
  return rows[0][0];
};

const add = async (data) => {
  const [rows] = await pool.query("CALL spAddUpdateCategory(?,?,?)", [
    null,
    data.categoryName,
    data.CurrentUser,
  ]);
  const result = rows?.[0]?.[0];

  if (!result) {
    return {
      success: 0,
      message: "No response from stored procedure",
    };
  }

  return result;
};

const update = async (data) => {
  const [rows] = await pool.query("CALL spAddUpdateCategory(?,?,?)", [
    data.categoryId,
    data.categoryName,
    data.CurrentUser,
  ]);
  const result = rows?.[0]?.[0];

  if (!result) {
    return {
      success: 0,
      message: "No response from stored procedure",
    };
  }

  return result;
};

const remove = async (categoryId, userId) => {
  const [resultSets] = await pool.query("CALL spInactiveCategoryById(?, ?)", [
    categoryId,
    userId,
  ]);

  const result = resultSets[0]?.[0];

  return {
    success: result?.success === 1,
    message: result?.message || "Unknown response from database",
  };
};

export default { getAll, getById, add, update, remove };
