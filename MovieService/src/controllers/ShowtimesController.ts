import prisma from "../config/prismaClient";
import { ShowtimeService } from "../services/showTimesService";
import { controllerWrapper } from "../utils/controllerWrapper";
import { NextFunction, Request, Response } from "express";

export class ShowtimeController {
  private static showtimeService = new ShowtimeService();

  static addShowtime = controllerWrapper(async (req: Request) => {
    const addShowtimes = await this.showtimeService.addShowtimes(req.body);

    return {
      status: 201,
      data: { addShowtimes },
      message: "Showtimes Added successfully",
    };
  });

  static getAllShowtimes = controllerWrapper(async () => {
    const showtimes = await this.showtimeService.getAllShowtimes();
    return {
      data: { showtimes, total: showtimes.length },
      message: "Showtimes retrieved successfully",
    };
  });

  static getShowtimeById = controllerWrapper(async (req: Request) => {
    const showTimeId = req.params.id;
    const showtimes = await this.showtimeService.getShowtimesById(showTimeId);
    return { data: showtimes, message: "Showtimes retrieved successfully" };
  });

  static updateShowtime = controllerWrapper(async (req: Request) => {
    const showtimes = await this.showtimeService.updateShowTimes(
      req.params.id,
      req.body
    );
    return { data: showtimes, message: "Showtimes updated successfully" };
  });

  static deleteShowtime = controllerWrapper(async (req: Request) => {
    await this.showtimeService.deleteShowTime(req.params.id);
    return { data: null, message: "Showtimes deleted successfully" };
  });

  static getShowtimesForMovie = controllerWrapper(async (req: Request) => {
    const movieId = req.params.movieId;
    const showtimes = await this.showtimeService.getShowtimesForMovie(movieId);
    return {
      data: showtimes,
      message: "Movie Showtimings  Fetched successfully",
    };
  });
}
