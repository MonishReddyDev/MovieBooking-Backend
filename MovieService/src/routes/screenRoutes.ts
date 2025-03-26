import { Router } from "express";
import { ScreenController } from "../controllers/ScreenController";
import { validateScreen } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/screens", validateScreen, ScreenController.createScreen);
router.get("/screens", ScreenController.getAllScreens);
router.get("/screens/:id", ScreenController.getScreenById);
router.put("/screens/:id", ScreenController.updateScreen);
router.delete("/screens/:id", ScreenController.deleteScreen);

export default router;
