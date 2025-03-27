import { Theater } from "@prisma/client";
import { TheaterRepository } from "../repositories/theaterRepository";
import { NotFoundError } from "../utils/customError";
import { TheaterType } from "../types/types";

export class TheaterService {
  private theaterRepo = new TheaterRepository();

  async createTheater(data: TheaterType) {
    const { name, location } = data;

    const theater = await this.theaterRepo.findByNameAndLocation(
      name,
      location
    );

    if (theater) {
      throw new NotFoundError(
        "Theater With same name and location already exist"
      );
    }

    const createdTheater = await this.theaterRepo.create(data);

    return createdTheater;
  }

  async getAllTheaters() {
    return this.theaterRepo.findAll();
  }

  async getTheaterById(theaterId: string) {
    const theater = await this.theaterRepo.findById(theaterId);
    if (!theater)
      throw new NotFoundError(`Movie with ID ${theaterId} not found`);
    return theater;
  }

  async updateTheater(theaterId: string, updateData: Partial<Theater>) {
    const theater = await this.theaterRepo.findById(theaterId);
    if (!theater) throw new NotFoundError("Theater not found!");
    return this.theaterRepo.update(theaterId, updateData);
  }

  async deleteTheater(theaterId: string) {
    const theater = await this.theaterRepo.findById(theaterId);
    if (!theater) throw new NotFoundError("Theater not found to Delete!");
    return this.theaterRepo.delete(theaterId);
  }
}
