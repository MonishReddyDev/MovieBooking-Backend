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
      () => prisma.screen.findMany(),
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
  async findByTheaterIdAndNumber(
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

  // Fetch the theater associated with the screen
  async findTheaterById(theaterId: string): Promise<Theater | null> {
    return prismaOperation(
      () => prisma.theater.findUnique({ where: { id: theaterId } }),
      "Failed to fetch theater by ID"
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
}
