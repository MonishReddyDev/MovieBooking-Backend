import { MovieRepository } from "../repositories/movieRepository";
import {
  DuplicateError,
  NotFoundError,
  ValidationError,
} from "../utils/customError";
import { Movie } from "@prisma/client";

export class MovieService {
  private movieRepo = new MovieRepository();

  async getAllMovies(): Promise<Movie[]> {
    return this.movieRepo.findMany();
  }

  async getMovieById(movieId: string): Promise<Movie> {
    const movie = await this.movieRepo.findById(movieId);
    if (!movie) throw new NotFoundError(`Movie with ID ${movieId} not found`);
    return movie;
  }

  async createMovie(data: Movie): Promise<Movie> {
    // Check if a movie with the same title already exists
    const existingMovie = await this.movieRepo.findByTitle(data.title);
    if (existingMovie) {
      throw new DuplicateError(
        `A movie with title "${data.title}" already exists`
      );
    }
    return this.movieRepo.createMovie(data);
  }

  async updateMovie(movieId: string, data: Partial<Movie>): Promise<Movie> {
    const existingMovie = await this.getMovieById(movieId);
    if (!existingMovie) {
      throw new NotFoundError(`Movie with ID ${movieId} not found`);
    }

    return this.movieRepo.update(movieId, data);
  }

  async deleteMovie(movieId: string): Promise<Movie | null> {
    const existingMovie = await this.getMovieById(movieId);

    return this.movieRepo.delete(movieId);
  }
}
