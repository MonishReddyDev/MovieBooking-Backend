import { Request, Response } from "express";
import { controllerWrapper } from "../utils/controllerWrapper";
import logger from "../utils/logger";
import { ScreenService } from "../services/ScreenService";

export class ScreenController {
  private static screenService = new ScreenService();

  // Create Screen
  static createScreen = controllerWrapper(async (req: Request) => {
    const screen = await this.screenService.createScreen(req.body);
    logger.info(`${screen.number} Screen added to Theater ${screen.theaterId}`);
    return {
      data: screen,
      message: "Screen created successfully",
      status: 201,
    };
  });

  // Get all screens
  static getAllScreens = controllerWrapper(async () => {
    const screens = await this.screenService.getAllScreens();
    logger.info(`All screens retrieved successfully`);
    return {
      data: screens,
      message: "Screens retrieved successfully",
    };
  });

  // Get screen by ID
  static getScreenById = controllerWrapper(async (req: Request) => {
    const screenId = req.params.id;
    const screen = await this.screenService.getScreenById(screenId);
    logger.info(`Screen ${screen.number} retrieved successfully`);
    return {
      data: screen,
      message: "Screen retrieved successfully",
    };
  });

  // Update screen
  static updateScreen = controllerWrapper(async (req: Request) => {
    const screenId = req.params.id;
    const updatedScreen = await this.screenService.updateScreen(
      screenId,
      req.body
    );
    logger.info(`Screen ${updatedScreen.number} updated successfully`);
    return {
      data: updatedScreen,
      message: "Screen updated successfully",
    };
  });

  // Delete screen
  static deleteScreen = controllerWrapper(async (req: Request) => {
    const screenId = req.params.id;
    await this.screenService.deleteScreen(screenId);
    return {
      data: null,
      message: "Screen deleted successfully",
    };
  });
}
