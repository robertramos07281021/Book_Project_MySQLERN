import { db } from "../dbConnections/dbConnection.js";
import jwt from "jsonwebtoken";

export default class API {
  //get all Books
  static async getBooks(req, res) {
    const q =
      "SELECT title, descriptions, user_name, cover FROM books INNER JOIN users on books.user_id = users.user_id";
    db.query(q, (err, data) => {
      if (err) return res.json({ error: err.message });
      return res.status(200).json(data);
    });
  }

  //insert new book
  static async createBook(req, res) {
    const { title, descriptions, cover } = req.body;
    if (!title || !descriptions || !cover) {
      return res.status(500).json("All fields are required!");
    }
    const q = "INSERT INTO books (title,descriptions,cover,user_id) VALUES ?";
    const values = [[title, descriptions, cover, req.user.user_id]];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: "Book has been created." });
    });
  }

  //update book
  static async updateBook(req, res) {
    const { id } = req.params;
    const { title, descriptions, cover } = req.body;
    if (!title || !descriptions || !cover) {
      return res.status(400).json("All fields are required!");
    }
    const q = `UPDATE books SET title = ?, descriptions = ?, cover = ? WHERE book_id = ?`;
    db.query(q, [title, descriptions, cover, id], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: "Book has been updated" });
    });
  }

  //get book
  static async getBook(req, res) {
    const { id } = req.params;
    const q = "SELECT * FROM books WHERE book_id = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json(data);
    });
  }

  //delete book
  static async deleteBook(req, res) {
    const { id } = req.params;
    const q = "DELETE FROM books where book_id = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: "Book has been deleted!" });
    });
  }

  //get user books
  static async getUserBooks(req, res) {
    const { accessToken } = req.cookies;
    const { id } = jwt.verify(accessToken, "booksAppSecrete");
    const q =
      "SELECT book_id,title, descriptions, cover, user_name FROM books INNER JOIN users on books.user_id = users.user_id where books.user_id = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.status(200).json({ messege: err.message });
      return res.status(200).json(data);
    });
  }
}
