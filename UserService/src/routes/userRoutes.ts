import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authenticateToken";
import {
  loginSchemaValidation,
  registerSchemaValidation,
  updateUserSchemaValidation,
} from "../middlewares/validationMiddleware";

const router = Router();

const userController = new UserController();
// Public routes
router.post("/register", registerSchemaValidation, userController.register);
router.post("/login", loginSchemaValidation, userController.login);

// Protected routes
router.post("/logout", authenticateToken, userController.logout);
router.get("/users/:id", authenticateToken, userController.getUserById);
router.get("/users", authenticateToken, userController.getAllUsers);
router.put(
  "/users/:id",
  updateUserSchemaValidation,
  authenticateToken,
  userController.updateUser
);
router.delete("/users/:id", authenticateToken, userController.deleteUser);

export default router;
