import jwt from "jsonwebtoken";
import { db } from "../dbConnections/dbConnection.js";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ error: "Authorization token not found" });
  }

  const token = req.headers.authorization.split(" ")[1];

  const { id } = jwt.verify(token, "booksAppSecrete");
  const q = "select * from users where user_id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    const { pass, ...userData } = data[0];
    req.user = userData;
    next();
  });
};

export default auth;
