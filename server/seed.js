import Database from "better-sqlite3";

const db = new Database("database.db");

// create USERS table
db.exec(`
CREATE TABLE IF NOT EXISTS users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE)`);

// create IMAGES table
db.exec(`
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  image_path TEXT NOT NULL ,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  UNIQUE(user_id, image_path)
)
`);

// ############# seed with test data #############################
db.exec(`
  INSERT INTO users (username) VALUES
    ('test_1'),
    ('test_2'),
    ('test_3'),
    ('test_4')
`);

db.exec(`
  INSERT INTO images (user_id, image_path) VALUES
    (1, '/image1'),
    (1, '/image2'),
    (2, '/image2'),
    (3, '/image3'),
    (3, '/image2')
`);
// ############# end of seed ##################################
