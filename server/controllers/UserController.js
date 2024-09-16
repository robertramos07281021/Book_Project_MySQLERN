import { db } from "../dbConnections/dbConnection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, "booksAppSecrete");
};

export default class USER {
  //register
  static async register(req, res) {
    const { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res
        .status(400)
        .json({ message: "Username or Password is required." });
    }

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists");
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      const createUser =
        "INSERT INTO users ( username , pass, user_name ) VALUES (?)";
      const values = [username, hashPass, name];
      db.query(createUser, [values], (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json({ message: "User has been created" });
      });
    });
  }

  //login
  static async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const q = "SELECT * FROM users where username = ?";
    db.query(q, [username], (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      if (data.length === 0)
        return res.status(404).json({ message: "User not found!" });
      if (data[0].isonline === 1)
        return res.status(400).json({ message: "Already login" });

      const checkPassword = bcrypt.compareSync(password, data[0].pass);

      if (!checkPassword)
        return res
          .status(400)
          .json({ message: "Incorrect username or password." });

      const { pass, isonline, user_id, ...user } = data[0];

      const updateLogin = "UPDATE users SET isonline = ? WHERE username = ?";
      db.query(updateLogin, [true, data[0].username]);

      const token = createToken(data[0].user_id, "bookUserSecrete");

      res
        .cookie("accessToken", token, { httpOnly: true, secure: true })
        .status(200)
        .json({ user, token });
    });
  }

  //logout
  static async logout(req, res) {
    const { accessToken } = req.cookies;

    if (req.cookies.accessToken) {
      const { id } = jwt.verify(accessToken, "booksAppSecrete");
      const updateLogin = "UPDATE users SET isonline = ? WHERE user_id = ?";
      db.query(updateLogin, [false, id]);
      res
        .clearCookie("accessToken", {
          secure: false,
          sameSite: "none",
        })
        .status(200)
        .json({ message: "User has been logout." });
    } else {
      return res
        .clearCookie("accessToken", {
          secure: false,
          sameSite: "none",
        })
        .status(200)
        .json({ message: "User has been logout." });
    }
  }
}
