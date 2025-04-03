import { Router } from "express";
import { ScreenController } from "../controllers/screenController";
import { validateScreen } from "../middlewares/validationMiddleware";

const router = Router();

router.post("/", validateScreen, ScreenController.createScreen);
router.get("/", ScreenController.getAllScreens);
router.get("/:id", ScreenController.getScreenById);
router.put("/:id", ScreenController.updateScreen);
router.delete("/:id", ScreenController.deleteScreen);

export default router;
