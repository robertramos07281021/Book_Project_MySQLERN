import { Router } from "express";
import API from "../controllers/BooksController.js";
import auth from "../middlewares/auth.js";
const router = Router();

router.get("/", API.getBooks);
router.get("/usersbooks", API.getUserBooks);
router.get("/:id", API.getBook);
router.post("/add", auth, API.createBook);
router.patch("/update/:id", auth, API.updateBook);
router.delete("/delete/:id", API.deleteBook);

export { router as BooksRouter };
