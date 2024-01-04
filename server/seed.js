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
  alt_text TEXT,
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
(1, '/https://images.unsplash.com/photo-1551725301-5183dc1dbb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5fHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1, 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwzfHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1, 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxfHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1, 'https://images.unsplash.com/photo-1603169812512-d6560fd13fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw2fHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, '/https://images.unsplash.com/photo-1605101479435-005f9c563944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw0fHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(3, '/https://images.unsplash.com/photo-1605101479435-005f9c563944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw0fHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(3, 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwzfHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080');

`);
// ############# end of seed ##################################
