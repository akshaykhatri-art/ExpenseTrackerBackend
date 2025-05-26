import masterModel from "../models/masterModel.js";

const getDropdown = async (req, res) => {
  try {
    const expenses = await masterModel.getDropdown(req.user.userId);
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getStatistics = async (req, res) => {
  try {
    const stats = await masterModel.getStatistics(req.user.userId);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { getDropdown, getStatistics };
