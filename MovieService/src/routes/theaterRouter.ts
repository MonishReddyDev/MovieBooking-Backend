import { Router } from "express";
import { TheaterController } from "../controllers/theaterController";
import { validateTheater } from "../middlewares/validationMiddleware";

const router = Router();

// Define routes for Theater CRUD operations
router.get("/theaters", TheaterController.getAllTheaters);
router.get("/theaters/:id", TheaterController.getTheaterById);
router.post("/theaters", validateTheater, TheaterController.createTheater);
router.put("/theaters/:id", TheaterController.updateTheater);
router.delete("/theaters/:id", TheaterController.deleteTheater);

export default router;
