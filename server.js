import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pool from "./config/db.js";

// auth route
import authRoutes from "./routes/authRoutes.js";

// category route
import categoryRoutes from "./routes/categoryRoutes.js";

// expense route
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/expense", expenseRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const conn = await pool.getConnection();
    console.log(`Connected to MySQL database: ${process.env.DB_NAME}`);
    conn.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MySQL database:", err.message);
    process.exit(1);
  }
};

startServer();
