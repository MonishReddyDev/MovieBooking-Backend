import { MovieService } from "../services/movieService";
import { Request } from "express";
import { controllerWrapper } from "../utils/controllerWrapper";
import logger from "../utils/logger";
import { ValidationError } from "../utils/customError";

export class MovieController {
  private static movieService = new MovieService();

  static createMovie = controllerWrapper(async (req: Request) => {
    const movie = await this.movieService.createMovie(req.body);

    logger.info(`Movie "${movie.title}" added to the Database`);

    return { data: movie, message: "Movie created successfully", status: 201 };
  });

  static getAllMovies = controllerWrapper(async () => {
    const movies = await this.movieService.getAllMovies();
    logger.info(`Fetched ${movies.length} movies from the database`);
    return {
      data: { movies, total: movies.length },
      message: "Movies retrieved successfully",
    };
  });

  static getMovieById = controllerWrapper(async (req: Request) => {
    const movieId = req.params.id;
    if (!movieId) {
      throw new ValidationError("movieId is requied!");
    }
    const movie = await this.movieService.getMovieById(movieId);
    logger.info(`Movie:${movie.title} retrieved successfully`);
    return { data: movie, message: "Movie retrieved successfully" };
  });

  static updateMovie = controllerWrapper(async (req: Request) => {
    const movieId = req.params.id;
    const movie = await this.movieService.updateMovie(movieId, req.body);
    logger.info(`Movie:${movie.title} updated successfully`);
    return { data: movie, message: "Movie updated successfully" };
  });

  static deleteMovie = controllerWrapper(async (req: Request) => {
    const movieId = req.params.id;
    const movie = await this.movieService.deleteMovie(movieId);
    logger.info(`Movie:${movie?.title} deleted successfully`);
    return { data: null, message: "Movie deleted successfully" };
  });
}
