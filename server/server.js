import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("root");
});

app.get("/users", (req, res) => {
  const users = db.prepare(`SELECT username FROM users`).all();
  res.json(users);
});

app.listen(3333, () => {
  console.log("server up on 3333");
});
