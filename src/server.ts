// src/server.ts
import dotenv from "dotenv";
dotenv.config();

import pool from "./config/db.js";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

async function waitForMySQL(retries = 10): Promise<void> {
  while (retries > 0) {
    try {
      const conn = await pool.getConnection();

      conn.release();

      console.log("✅ Connexion MySQL réussie");

      return;
    } catch (error) {
      console.log("⏳ En attente de MySQL...");

      retries--;

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }

  throw new Error("Impossible de se connecter à MySQL");
}

async function startServer() {
  try {
    await waitForMySQL();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Démarrage impossible :", error);

    process.exit(1);
  }
}

startServer();
