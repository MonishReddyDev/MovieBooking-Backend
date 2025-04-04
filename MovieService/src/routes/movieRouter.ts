import { Router } from "express";
import { MovieController } from "../controllers/movieController";
import { validateMovie } from "../middlewares/validationMiddleware";
import { checkAdmin } from "../middlewares/authorizationMiddleware";

const router = Router();

router.post("/", checkAdmin, validateMovie, MovieController.createMovie); //admin
router.get("/", MovieController.getAllMovies);
router.get("/:id", MovieController.getMovieById);
router.put("/:id", checkAdmin, MovieController.updateMovie); //admin
router.delete("/:id", checkAdmin, MovieController.deleteMovie); //admin

export default router;
