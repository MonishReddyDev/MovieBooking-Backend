import { Showtime } from "@prisma/client";
import prisma from "../config/prismaClient";
import { prismaOperation } from "../utils/PrismaOperationWrapper";
import { ShowtimeWithDetails } from "../types/types";

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

  async findAll(): Promise<ShowtimeWithDetails[]> {
    return prismaOperation(
      () =>
        prisma.showtime.findMany({
          select: {
            id: true,
            startTime: true,
            endTime: true,
            availableSeats: true,
            showType: true,
            createdAt: true,
            updatedAt: true,
            movie: {
              select: { id: true, title: true },
            },
            theater: {
              select: { id: true, name: true },
            },
            screen: {
              select: { id: true, number: true },
            },
          },
        }),
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

  // Get All Showtimes Purpose: Retrieve all showtimes for a specific theater, movie, or a given date range.
}
