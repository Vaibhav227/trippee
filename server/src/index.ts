import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import knex from "knex";
import config from "./database/knexfile";

dotenv.config();
const environment = process.env.ENV || "dev";

// Db connection
const db = knex(config[environment]);
// Test the connection
db.raw("SELECT 1")
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL database:", error);
  });

const app: Express = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running.");
});

app.listen(PORT, () => {
  console.log(`Server is up and running at PORT: ${PORT}`);
});
