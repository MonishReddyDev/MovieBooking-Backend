import { Showtime } from "@prisma/client";
import prisma from "../config/prismaClient";
import { prismaOperation } from "../utils/PrismaOperationWrapper";

export class ShowTimesRepository {
  async create(
    showTimedata: Omit<Showtime, "id" | "createdAt" | "updatedAt">
  ): Promise<Showtime> {
    return prismaOperation(
      () =>
        prisma.showtime.create({
          data: {
            startTime: showTimedata.startTime,
            endTime: showTimedata.endTime,
            availableSeats: showTimedata.availableSeats,
            showType: showTimedata.showType,
            movie: { connect: { id: showTimedata.movieId } },
            theater: { connect: { id: showTimedata.theaterId } },
            screen: { connect: { id: showTimedata.screenId } },
          },
        }),
      "Failed to create Showtime"
    );
  }

  async findOverlappingShowtime(
    movieId: string,
    theaterId: string,
    startTime: Date,
    endTime: Date,
    screenId: string
  ) {
    return prismaOperation(
      () =>
        prisma.showtime.findFirst({
          where: {
            movieId,
            theaterId,
            screenId,
            AND: [
              {
                // The start time of the new showtime is before an existing one ends,
                // and the end time of the new showtime is after the existing one starts.
                startTime: {
                  lt: endTime,
                },
                endTime: {
                  gt: startTime, // The new showtime should end after an existing showtime starts
                },
              },
            ],
          },
        }),
      "Failed to find overlapping showtime"
    );
  }

  async findByMovieAndTheater(
    movieId: string,
    theaterId: string,
    startTime: Date,
    screenId: string
  ): Promise<Showtime | null> {
    return prismaOperation(
      () =>
        prisma.showtime.findUnique({
          where: {
            movieId_theaterId_startTime_screenId: {
              movieId,
              theaterId,
              startTime,
              screenId,
            },
          },
        }),
      "Failed to fetch the Movie and Theater"
    );
  }
  

  async findAll(): Promise<Showtime[]> {
    return prismaOperation(
      () => prisma.showtime.findMany(),
      "Failed to fetch Showtimes"
    );
  }

  async update(id: string, updateData: Partial<Showtime>): Promise<Showtime> {
    return prismaOperation(
      () => prisma.showtime.update({ where: { id: id }, data: updateData }),
      "Failed to update Showtime"
    );
  }

  async delete(id: string): Promise<Showtime> {
    return prismaOperation(
      () => prisma.showtime.delete({ where: { id } }),
      "Failed to delete Showtime"
    );
  }

  async findById(id: string): Promise<Showtime | null> {
    return prismaOperation(
      () =>
        prisma.showtime.findUnique({
          where: { id },
          include: {
            movie: true, // Fetch linked movie details
            theater: true, // Fetch linked theater details
          },
        }),
      "Failed to fetch Showtime by ID"
    );
  }
}
