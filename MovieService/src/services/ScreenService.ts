import { Screen } from "@prisma/client";
import { NotFoundError, ValidationError } from "../utils/customError";
import { ScreenType } from "../types/types";
import { ScreenRepository } from "../repositories/screenRepository";
import { TheaterService } from "./TheaterService";
import logger from "../utils/logger";

export class ScreenService {
  private screenRepo = new ScreenRepository();
  private theaterService = new TheaterService();

  // Create a new screen
  async createScreen(data: ScreenType) {
    const { theaterId, number, capacity } = data;

    // Ensure the theater exists
    const theater = await this.theaterService.getTheaterById(theaterId);

    if (!theater) {
      throw new NotFoundError("Theater not found!");
    }
    // Ensure that the screen number is unique for the theater
    const existingScreen = await this.screenRepo.findScreenByNumberInTheater(
      theaterId,
      number
    );

    logger.info("This is an existingScreenexistingScreen", existingScreen);

    if (existingScreen) {
      throw new ValidationError(
        "Screen with this number already exists in this theater"
      );
    }

    // Ensure total capacity does not exceed theater capacity
    const screens = await this.screenRepo.getAllScreensInTheater(theaterId);
    logger.info("All screens of  this", theater, ":", screens);

    const totalAllocatedSeats = screens.reduce(
      (sum, screen) => sum + screen.capacity,
      0
    );

    logger.info("totalAllocatedSeats:", totalAllocatedSeats);

    if (totalAllocatedSeats + capacity > theater.totalSeats) {
      throw new ValidationError(
        "Adding this screen will exceed the theater's total capacity!"
      );
    }

    const createdScreen = await this.screenRepo.create(data);
    return createdScreen;
  }

  // Get all screens
  async getAllScreens() {
    return this.screenRepo.findAll();
  }

  // Get a specific screen by ID
  async getScreenById(screenId: string) {
    const screen = await this.screenRepo.findById(screenId);
    if (!screen)
      throw new NotFoundError(`Screen with id ${screenId} not found!`);
    return screen;
  }

  // Update a screen
  async updateScreen(screenId: string, updateData: Partial<Screen>) {
    const { theaterId } = updateData;
    const screen = await this.screenRepo.findById(screenId);
    if (!screen) throw new NotFoundError("Screen not found!");
    if (!theaterId) {
      throw new ValidationError("Theater ID is required.");
    }
    const theater = await this.theaterService.getTheaterById(theaterId);
    const updatedScreen = this.screenRepo.update(screenId, updateData);
    return updatedScreen;
  }

  // Delete a screen
  async deleteScreen(screenId: string) {
    const screen = await this.screenRepo.findById(screenId);
    if (!screen) throw new NotFoundError("Screen not found!");
    return this.screenRepo.delete(screenId);
  }
}
