import { Showtime } from "@prisma/client";
import { ShowTimesRepository } from "../repositories/showTimesRepository";
import { MovieService } from "./movieService";
import { NotFoundError, ValidationError } from "../utils/customError";

import { ShowtimeWithDetails } from "../types/types";
import { TheaterService } from "./theaterService";
import { ScreenService } from "./screenService";

export class ShowtimeService {
  private showTimeRepo = new ShowTimesRepository();
  private movieService = new MovieService();
  private theaterService = new TheaterService();
  private screenService = new ScreenService();

  async addShowtimes(
    showtimeData: Omit<Showtime, "id" | "createdAt" | "updatedAt">
  ): Promise<Showtime> {
    const { movieId, screenId, theaterId, endTime, startTime } = showtimeData;
    const movie = await this.movieService.getMovieById(movieId);
    if (!movie) {
      throw new NotFoundError(`Movie not found`);
    }
    // Check if the theater exists
    const theater = await this.theaterService.getTheaterById(theaterId);
    if (!theater) {
      throw new NotFoundError(`Theater not found`);
    }
    // Check if the screen exists
    const screen = await this.screenService.getScreenById(screenId);
    // Check if the showtime already exists for this movie, theater, screen, and start time
    const overlappingShowtime = await this.showTimeRepo.findOverlappingShowtime(
      movieId,
      theaterId,
      startTime,
      endTime,
      screenId
    );

    if (overlappingShowtime) {
      throw new ValidationError(
        "Showtime already exists for this movie in the specified theater and screen."
      );
    }

    // Check available seats and ensure they don't exceed total theater capacity
    if (showtimeData.availableSeats > theater.totalSeats) {
      throw new ValidationError(
        `Available seats cannot exceed total theater capacity of ${theater.totalSeats}`
      );
    }

    //create the showtimes
    const addedShowtime = await this.showTimeRepo.create(showtimeData);

    return addedShowtime;
  }

  async getAllShowtimes(): Promise<ShowtimeWithDetails[]> {
    return this.showTimeRepo.findAll();
  }

  async getShowtimesById(id: string) {
    return this.showTimeRepo.findById(id);
  }

  async deleteShowTime(id: string): Promise<Showtime | null> {
    return this.showTimeRepo.delete(id);
  }

  async updateShowTimes(
    id: string,
    updateData: Partial<Showtime>
  ): Promise<Showtime> {
    const { startTime, endTime, screenId, movieId, theaterId } = updateData;

    // 1. Check if the showtime exists
    const existingShowtime = await this.showTimeRepo.findById(id);

    if (movieId) {
      await this.movieService.getMovieById(movieId);
    }
    if (theaterId) {
      await this.theaterService.getTheaterById(theaterId);
    }
    if (screenId) {
      await this.screenService.getScreenById(screenId);
    }

    if (!existingShowtime) {
      throw new NotFoundError("showTime Not found");
    }

    // 2. Ensure the start time is before the end time
    if (
      new Date(startTime ?? existingShowtime.startTime) >=
      new Date(endTime ?? existingShowtime.endTime)
    ) {
      throw new ValidationError("Start time must be before end time");
    }

    // 3. Check if availableSeats exceed the theater capacity
    const theater = await this.theaterService.getTheaterById(
      theaterId ?? existingShowtime.theaterId
    );

    if (
      updateData.availableSeats &&
      updateData.availableSeats > theater.totalSeats
    ) {
      throw new ValidationError(
        `Available seats cannot exceed total theater capacity of ${theater.totalSeats}`
      );
    }

    // 4. Check if the updated start and end time overlap with any other showtimes
    const overlappingShowtime = await this.showTimeRepo.findOverlappingShowtime(
      movieId ?? existingShowtime.movieId, // Use existing movieId if not provided in updateData
      theaterId ?? existingShowtime.theaterId, // Use existing theaterId if not provided in updateData
      startTime ?? existingShowtime.startTime, // Use existing startTime if not provided in updateData
      endTime ?? existingShowtime.endTime, // Use existing endTime if not provided in updateData
      screenId ?? existingShowtime.screenId // Use existing screenId if not provided in updateData
    );

    if (overlappingShowtime) {
      throw new ValidationError(
        "The updated showtime overlaps with another showtime for this screen"
      );
    }

    // 5. Update the showtime
    const updatedShowtime = await this.showTimeRepo.update(id, updateData);
    return updatedShowtime;
  }
}
