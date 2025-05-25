import expenseModel from "../models/expenseModel.js";

const getAll = async (req, res) => {
  try {
    const expenses = await expenseModel.getAll(req.user.userId);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getById = async (req, res) => {
  try {
    const expense = await expenseModel.getById(req.params.id, req.user.userId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const add = async (req, res) => {
  try {
    const data = {
      ...req.body,
      CurrentUser: req.user.userId,
    };

    const result = await expenseModel.add(data);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const update = async (req, res) => {
  try {
    const data = {
      ...req.body,
      CurrentUser: req.user.userId,
    };

    const result = await expenseModel.update(data);

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    const result = await expenseModel.remove(req.params.id, req.user.userId);

    if (!result.success) {
      return res.status(403).json({ error: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getFiltered = async (req, res) => {
  try {
    const {
      userId = "All",
      categoryId = "All",
      startDate,
      endDate,
    } = req.query;

    const expenses = await expenseModel.getFiltered({
      userId,
      categoryId,
      startDate,
      endDate,
    });

    res.status(200).json(expenses);
  } catch (err) {
    console.error("Error in getFiltered:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { getAll, getById, add, update, remove, getFiltered };
