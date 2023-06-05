import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import knex from "knex";
import config from "./knexfile.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();
const environment = process.env.ENV || "development";

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

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.send("Server is up and running.");
});


app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running at PORT: ${PORT}`);
});
