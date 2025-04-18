// routes/showtimeRoutes.ts
import { Router } from "express";
import { ShowtimeController } from "../controllers/showtimesController";
import {
  validateShowTime,
  validateshowtimeUpdateSchema,
} from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateShowTime, ShowtimeController.addShowtime); //admin

router.get("/", ShowtimeController.getAllShowtimes);
router.get("/:id", ShowtimeController.getShowtimeById);
router.put(
  "/:id",
  validateshowtimeUpdateSchema,
  ShowtimeController.updateShowtime
); //admin

router.delete("/:id", ShowtimeController.deleteShowtime); //admin

// Additional routes
router.get("/movies/:movieId", ShowtimeController.getShowtimesForMovie);
router.get("/:showtimeId/seats", ShowtimeController.getAvailableSeats);

export default router;
