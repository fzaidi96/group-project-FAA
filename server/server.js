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
  const users = db.prepare(`SELECT * FROM users`).all();
  res.json(users);
});

//add new user
app.post("/users", (req, res) => {
  console.log(req.body);
  const userName = req.body.user;

  const newentry = db
    .prepare(
      `
    INSERT INTO users (username) VALUES (?)`
    )
    .run(userName);
  res.json(newentry);
});

//log new likes
app.post("/liked", (req, res) => {
  const UserId = req.body.id;
  const img = req.body.imagePath;
  console.log(UserId, img);
  const updateEntry = db
    .prepare(
      `INSERT INTO images
(user_id, image_path)
VALUES (?,?)`
    )
    .run(UserId, img);
  res.json(updateEntry);
  console.log("updated entry: ", updateEntry);
});
//Fetch user images
app.post("/userImages", (req, res) => {
  const UserId = req.body.id;
  console.log("fetch img for user", UserId);
  const returnedImg = db
    .prepare(`SELECT id, image_path FROM images WHERE user_id = ?`)
    .all(UserId);
  res.json(returnedImg);
});

app.post("/unlike", (req, res) => {
  const imgID = req.body.id;
  const remImg = db
    .prepare(
      `
DELETE FROM images
WHERE id = ?`
    )
    .run(`${imgID}`);
  res.json(remImg);
  console.log("deleted entry:", imgID);
});
//port
app.listen(3333, () => {
  console.log("server up on 3333");
});
