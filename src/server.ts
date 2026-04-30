import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import pool from "./config/db";
import auth from "./routes/auth.route";
import articles from "./routes/articles.route";
import events from "./routes/events.routes";
import categories from "./routes/category.route";
import nasa from "./routes/nasa.route";
import spaceflight from "./routes/spaceflight.routes";
import spacex from "./routes/spacex.routes";
import dashboardAdmin from "./routes/dashboardAdmin.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/articles", articles);
app.use("/api/events", events);
app.use("/api/categories", categories);
app.use("/api/nasa", nasa);
app.use("/api/spaceflight", spaceflight);
app.use("/api/spacex", spacex);
app.use("/api/dashboard/admin", dashboardAdmin);

app.listen(PORT, async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connexion MySQL réussie");
    conn.release();
  } catch (err) {
    console.error("❌ Échec connexion MySQL :", err);
  }
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
