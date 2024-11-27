import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import routes from "./routes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

