import { Screen, Theater } from "@prisma/client";
import prisma from "../config/prismaClient";
import { prismaOperation } from "../utils/PrismaOperationWrapper";
import { ScreenType } from "../types/types";

export class ScreenRepository {
  // Create a new screen in the database
  async create(data: ScreenType): Promise<Screen> {
    return prismaOperation(
      () =>
        prisma.screen.create({
          data: data,
        }),
      "Failed to create screen"
    );
  }

  // Fetch all screens
  async findAll(): Promise<Screen[]> {
    return prismaOperation(
      () =>
        prisma.screen.findMany({
          include: {
            theater: {
              select: {
                name: true,
              },
            },
          },
        }),
      "Failed to fetch screens"
    );
  }

  // Fetch a screen by ID
  async findById(id: string): Promise<Screen | null> {
    return prismaOperation(
      () => prisma.screen.findUnique({ where: { id } }),
      "Failed to fetch screen by ID"
    );
  }

  // Find a screen by theater ID and number
  async findScreenByTheaterId(
    theaterId: string,
    number: number
  ): Promise<Screen | null> {
    return prismaOperation(
      () =>
        prisma.screen.findFirst({
          where: {
            theaterId: theaterId,
            number: number,
          },
        }),
      "Failed to check if screen exists"
    );
  }

  // Update screen details
  async update(id: string, updateData: Partial<Screen>): Promise<Screen> {
    return prismaOperation(
      () => prisma.screen.update({ where: { id }, data: updateData }),
      "Failed to update screen"
    );
  }

  // Delete a screen
  async delete(id: string): Promise<Screen> {
    return prismaOperation(
      () => prisma.screen.delete({ where: { id } }),
      "Failed to delete screen"
    );
  }

  async findScreenByNumberInTheater(theaterId: string, number: number) {
    return prismaOperation(
      () =>
        prisma.screen.findFirst({
          where: {
            theaterId,
            number,
          },
        }),
      "Failed to find Screen By Number In Theater"
    );
  }

  async getAllScreensInTheater(theaterId: string) {
    return prismaOperation(
      () =>
        prisma.screen.findMany({
          where: { theaterId },
        }),
      "Failed to Fetch all The Screen of A theater"
    );
  }
}
