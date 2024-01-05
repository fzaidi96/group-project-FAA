import Database from "better-sqlite3";

const db = new Database("database.db");

// create USERS table
db.exec(`
CREATE TABLE IF NOT EXISTS users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE)`);

// create IMAGES table
db.exec(`
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  image_path TEXT NOT NULL,
  alt_text TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, image_path)
)

`);

// ############# seed with test data #############################
db.exec(`
  INSERT INTO users (username) VALUES
    ('Select User'),
    ('Cassandra Lion'),
    ('Tony Seal'),
    ('Taylor Ant')
`);

db.exec(`
INSERT INTO images (user_id, image_path) VALUES
(1, 'https://images.unsplash.com/photo-1551725301-5183dc1dbb83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5fHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1, 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwzfHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1, 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxfHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1, 'https://images.unsplash.com/photo-1603169812512-d6560fd13fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw2fHxmb3h8ZW58MHx8fHwxNzA0MzAxMDQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1,'https://images.unsplash.com/photo-1511311219972-4df5faba0fd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwyMTd8fHdlbGNvbWV8ZW58MHx8fHwxNzA0NDQ3OTI3fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(1,'https://images.unsplash.com/flagged/photo-1570084787226-c77bdc6a1705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwyMjF8fHdlbGNvbWV8ZW58MHx8fHwxNzA0NDQ3OTI3fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, 'https://images.unsplash.com/photo-1602694866292-c0597a4452b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5MXx8bGlvbnxlbnwwfHx8fDE3MDQ0NDc1NDh8MA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, 'https://images.unsplash.com/photo-1560950314-3d535f24e2bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5Mnx8bGlvbnxlbnwwfHx8fDE3MDQ0NDc1NDh8MA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, 'https://images.unsplash.com/photo-1620637506361-53323b3e0a33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5M3x8bGlvbnxlbnwwfHx8fDE3MDQ0NDc1NDh8MA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, 'https://images.unsplash.com/photo-1517689336274-0184339e2b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5NHx8bGlvbnxlbnwwfHx8fDE3MDQ0NDc1NDh8MA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, 'https://images.unsplash.com/photo-1547368804-685c3fcbd525?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5Nnx8bGlvbnxlbnwwfHx8fDE3MDQ0NDc1NDh8MA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, 'https://images.unsplash.com/photo-1588540828794-fba2342b0ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5NXx8bGlvbnxlbnwwfHx8fDE3MDQ0NDc1NDh8MA&ixlib=rb-4.0.3&q=80&w=1080'),
(2, 'https://images.unsplash.com/photo-1562512619-e5ed0e495c78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHw5OHx8bGlvbnxlbnwwfHx8fDE3MDQ0NDc1NDh8MA&ixlib=rb-4.0.3&q=80&w=1080'),
(3, 'https://images.unsplash.com/photo-1561553906-3ef6b2a9c0b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTF8fHNlYWx8ZW58MHx8fHwxNzA0NDQ3NzE1fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(3, 'https://images.unsplash.com/photo-1582032878202-cdcc551be123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTJ8fHNlYWx8ZW58MHx8fHwxNzA0NDQ3NzE1fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(3, 'https://images.unsplash.com/photo-1557973154-1e1adbca11e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTN8fHNlYWx8ZW58MHx8fHwxNzA0NDQ3NzE1fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(3, 'https://images.unsplash.com/photo-1573924429164-2e29488b6e16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTR8fHNlYWx8ZW58MHx8fHwxNzA0NDQ3NzE1fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(3, 'https://images.unsplash.com/photo-1542721793-00ef09294436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTh8fHNlYWx8ZW58MHx8fHwxNzA0NDQ3NzE1fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(3,'https://images.unsplash.com/photo-1572810927919-6b9c93a8b949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTl8fHNlYWx8ZW58MHx8fHwxNzA0NDQ3NzE1fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(4, 'https://images.unsplash.com/photo-1439221658187-4d4bd6512add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTh8fGFudHN8ZW58MHx8fHwxNzA0NDQ3ODM2fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(4, 'https://images.unsplash.com/photo-1593995380931-0f3f6c1ee9c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTd8fGFudHN8ZW58MHx8fHwxNzA0NDQ3ODM2fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(4, 'https://images.unsplash.com/photo-1615715577645-625c4d34643a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTZ8fGFudHN8ZW58MHx8fHwxNzA0NDQ3ODM2fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(4, 'https://images.unsplash.com/photo-1568231026164-e0faf8fd9fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTV8fGFudHN8ZW58MHx8fHwxNzA0NDQ3ODM2fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(4, 'https://images.unsplash.com/photo-1532542478312-23286a27fe0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTR8fGFudHN8ZW58MHx8fHwxNzA0NDQ3ODM2fDA&ixlib=rb-4.0.3&q=80&w=1080'),
(4, 'https://images.unsplash.com/photo-1590781135959-fc6745e77330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NDc3NDl8MHwxfHNlYXJjaHwxNTN8fGFudHN8ZW58MHx8fHwxNzA0NDQ3ODM2fDA&ixlib=rb-4.0.3&q=80&w=1080')


`);
// ############# end of seed ##################################
