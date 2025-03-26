import { Router } from "express";
import { MovieController } from "../controllers/MovieController";
import { validateMovie } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/movies", validateMovie, MovieController.createMovie);
router.get("/movies", MovieController.getAllMovies);
router.get("/movie/:id", MovieController.getMovieById);
router.put("/movies/:id", MovieController.updateMovie);
router.delete("/movies/:id", MovieController.deleteMovie);

export default router;
