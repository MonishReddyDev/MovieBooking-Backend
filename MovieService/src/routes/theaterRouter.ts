import { Router } from "express";
import { TheaterController } from "../controllers/theaterController";
import { validateTheater } from "../middlewares/validationMiddleware";

const router = Router();

// Define routes for Theater CRUD operations
router.get("/", TheaterController.getAllTheaters);
router.get("/:id", TheaterController.getTheaterById);
router.post("/", validateTheater, TheaterController.createTheater); //admin
router.put("/:id", TheaterController.updateTheater); //admin
router.delete("/:id", TheaterController.deleteTheater); //admin

export default router;
