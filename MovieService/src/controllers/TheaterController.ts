import { Request, Response } from "express";
import { TheaterService } from "../services/theaterService";
import { controllerWrapper } from "../utils/controllerWrapper";
import logger from "../utils/logger";

export class TheaterController {
  private static theaterService = new TheaterService();

  static createTheater = controllerWrapper(async (req: Request) => {
    const theater = await this.theaterService.createTheater(req.body);

    logger.info(
      `${theater.name} Theater is Added at this ${theater.location} `
    );

    return {
      data: theater,
      message: "Theater created successfully",
      status: 201,
    };
  });

  static getAllTheaters = controllerWrapper(async () => {
    const theaters = await this.theaterService.getAllTheaters();

    logger.info(`All Theaters Fetched successfully `);

    return {
      data: theaters,
      message: "Theaters retrieved successfully",
    };
  });

  static getTheaterById = controllerWrapper(async (req: Request) => {
    const theaterId = req.params.id;
    const theater = await this.theaterService.getTheaterById(theaterId);
    logger.info(`${theater.name} Theater Fetched successfully `);
    return { data: theater, message: "Theater retrieved successfully" };
  });

  static updateTheater = controllerWrapper(async (req: Request) => {
    const theaterId = req.params.id;
    const theater = await this.theaterService.updateTheater(
      theaterId,
      req.body
    );
    logger.info(`${theater.name} Theater Updated successfully `);
    return { data: theater, message: "Theater updated successfully" };
  });

  static deleteTheater = controllerWrapper(async (req: Request) => {
    const theaterId = req.params.id;
    await this.theaterService.deleteTheater(theaterId);
    return { data: null, message: "Theater deleted successfully" };
  });
}
