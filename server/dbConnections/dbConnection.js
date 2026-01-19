import mysql from "mysql";
import "dotenv/config.js";

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "books_db",
  port: 10494,
});

db.connect(function (err) {
  if (err) {
    console.error("Error Connection :", err.stack);
    return;
  }
  console.log("Connected as id", db.threadId);
});

// db.query(
//   "create table users (user_id int primary key auto_increment not null, pass varchar(255) not null, username varchar(50) not null,isonline boolean default false, user_name varchar(50) )",
//   (err, data) => {
//     if (err) return console.log(err);
//   }
// );

// db.query(
//   "create table books (book_id int primary key auto_increment not null, title varchar(50) not null, descriptions varchar(1000) not null, cover varchar(255) not null, user_id int, foreign key (user_id) references users(user_id))",
//   (err, data) => {
//     if (err) return console.log(err);
//   }
// );

export { db };
