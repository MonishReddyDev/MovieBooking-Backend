import { Router } from "express";

import movieRoutes from "./movieRouter";
import showTimeRoutes from "./showTimesRouter";
import theaterRoutes from "./theaterRouter";
import screenRoutes from "./screenRoutes";

const router = Router();

router.use("/movies", movieRoutes);
router.use("/showtimes", showTimeRoutes);
router.use("/theaters", theaterRoutes);
router.use("/screens", screenRoutes);

export default router;
