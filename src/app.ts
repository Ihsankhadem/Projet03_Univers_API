// src/app.ts
import express from "express";
import cors from "cors";

import auth from "./routes/auth.route.js";
import articles from "./routes/articles.route.js";
import events from "./routes/events.routes.js";
import categories from "./routes/category.route.js";
import nasa from "./routes/nasa.route.js";
import spaceflight from "./routes/spaceflight.routes.js";
import spacex from "./routes/spacex.routes.js";
import dashboardAdmin from "./routes/dashboardAdmin.route.js";
import DashboardRedacteur from "./routes/dashboardRedacteur.route.js";
import users from "./routes/user.route.js";
import upload from "./routes/upload.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);

app.use("/api/auth", auth);
app.use("/api/articles", articles);
app.use("/api/events", events);
app.use("/api/categories", categories);
app.use("/api/nasa", nasa);
app.use("/api/spaceflight", spaceflight);
app.use("/api/spacex", spacex);
app.use("/api/dashboard/admin", dashboardAdmin);
app.use("/api/dashboard/redacteur", DashboardRedacteur);
app.use("/api/users", users);
app.use("/api/upload", upload);

app.use(errorHandler);

export default app;
