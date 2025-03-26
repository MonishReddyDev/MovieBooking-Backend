import { Theater } from "@prisma/client";
import prisma from "../config/prismaClient";
import { prismaOperation } from "../utils/PrismaOperationWrapper";
import { TheaterType } from "../types/types";

export class TheaterRepository {
  async create(data: TheaterType): Promise<Theater> {
    return prismaOperation(
      () =>
        prisma.theater.create({
          data: data,
        }),
      "Failed to create Theater"
    );
  }

  async findByNameAndLocation(
    name: string,
    location: string
  ): Promise<Theater | null> {
    return prismaOperation(
      () =>
        prisma.theater.findFirst({
          where: {
            name: name,
            location: location,
          },
        }),
      "Failed to check if the theater exists"
    );
  }

  async findAll(): Promise<Theater[]> {
    return prismaOperation(
      () => prisma.theater.findMany(),
      "Failed to fetch Theaters"
    );
  }

  async findById(id: string): Promise<Theater | null> {
    return prismaOperation(
      () => prisma.theater.findUnique({ where: { id } }),
      "Failed to fetch Theater by ID"
    );
  }

  async update(id: string, updateData: Partial<Theater>): Promise<Theater> {
    return prismaOperation(
      () => prisma.theater.update({ where: { id }, data: updateData }),
      "Failed to update Theater"
    );
  }

  async delete(id: string): Promise<Theater> {
    return prismaOperation(
      () => prisma.theater.delete({ where: { id } }),
      "Failed to delete Theater"
    );
  }
}
