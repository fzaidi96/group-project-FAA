import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

//root
app.get("/", (req, res) => {
  res.json("root");
});

//fetch usernames 4 dropdown
app.get("/users", (req, res) => {
  const users = db.prepare(`SELECT username FROM users`).all();
  res.json(users);
});

//add new user
app.post("/users", (req, res) => {
  console.log(req.body);
  const userName = req.body.user;

  const newentry = db
    .prepare(
      `
    INSERT INTO users (username)`
    )
    .run(userName);
  res.json(newentry);
});

//port
app.listen(3333, () => {
  console.log("server up on 3333");
});
