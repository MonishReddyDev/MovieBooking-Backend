import { Router } from "express";
import { TheaterController } from "../controllers/theaterController";
import { validateTheater } from "../middlewares/validationMiddleware";

const router = Router();

// Define routes for Theater CRUD operations
router.get("/", TheaterController.getAllTheaters);
router.get("/:id", TheaterController.getTheaterById);
router.post("/", validateTheater, TheaterController.createTheater);
router.put("/:id", TheaterController.updateTheater);
router.delete("/:id", TheaterController.deleteTheater);

export default router;
