// routes/showtimeRoutes.ts
import { Router } from "express";
import { ShowtimeController } from "../controllers/showtimesController";
import {
  validateShowTime,
  validateshowtimeUpdateSchema,
} from "../middlewares/validationMiddleware";

const router = Router();

router.post(
  "/movies/showtimes",
  validateShowTime,
  ShowtimeController.addShowtime
);
router.get("/showtimes", ShowtimeController.getAllShowtimes);
router.get("/showtimes/:id", ShowtimeController.getShowtimeById);
router.put(
  "/showtimes/:id",
  validateshowtimeUpdateSchema,
  ShowtimeController.updateShowtime
);
router.delete("/showtimes/:id", ShowtimeController.deleteShowtime);

export default router;
