import { Screen } from "@prisma/client";
import { NotFoundError, ValidationError } from "../utils/customError";
import { ScreenType } from "../types/types";
import { ScreenRepository } from "../repositories/screenRepository";
import { TheaterService } from "./TheaterService";

export class ScreenService {
  private screenRepo = new ScreenRepository();
  private theaterService = new TheaterService();

  // Create a new screen
  async createScreen(data: ScreenType) {
    const { theaterId, number } = data;

    // Ensure the theater exists
    const theater = await this.screenRepo.findTheaterById(theaterId);
    if (!theater) {
      throw new NotFoundError("Theater not found!");
    }

    // Ensure that the screen number is unique for the theater
    const existingScreen = await this.screenRepo.findByTheaterIdAndNumber(
      theaterId,
      number
    );
    if (existingScreen) {
      throw new ValidationError(
        "Screen with this number already exists in this theater"
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
