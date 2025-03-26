import prisma from "../config/prismaClient";
import { prismaOperation } from "../utils/PrismaOperationWrapper";
import { Movie } from "@prisma/client";

export class MovieRepository {
  async createMovie(data: Movie): Promise<Movie> {
    return prismaOperation(
      () => prisma.movie.create({ data }),
      "Failed to create movie"
    );
  }

  async findByTitle(title: string): Promise<Movie | null> {
    return prismaOperation(
      () => prisma.movie.findFirst({ where: { title: title } }),
      "Failed to fetch movie by title"
    );
  }

  async findMany(): Promise<Movie[]> {
    return prismaOperation(
      () => prisma.movie.findMany(),
      "Failed to fetch movies"
    );
  }

  async findById(movieId: string): Promise<Movie | null> {
    return prismaOperation(
      () =>
        prisma.movie.findUnique({
          where: { id: movieId },
        }),
      "Failed to fetch movie"
    );
  }
  async update(movieId: string, updateData: Partial<Movie>): Promise<Movie> {
    return prismaOperation(
      () => prisma.movie.update({ where: { id: movieId }, data: updateData }),
      "Failed to update movie"
    );
  }

  async delete(movieId: string): Promise<Movie> {
    return prismaOperation(
      () => prisma.movie.delete({ where: { id: movieId } }),
      "Failed to delete movie"
    );
  }
}
