import { Router } from "express";
import { MovieController } from "../controllers/movieController";
import { validateMovie } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateMovie, MovieController.createMovie);
router.get("/", MovieController.getAllMovies);
router.get("/:id", MovieController.getMovieById);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);

export default router;
