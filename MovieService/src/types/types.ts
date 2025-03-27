import { ShowType } from "@prisma/client";

export interface TheaterType {
  name: string;
  location: string;
  totalSeats: number;
}

export interface Showtime {
  startTime: string;
  endTime: string;
  availableSeats: number;
  theaterId: "7b148536-c055-4e7c-92f9-8974f2c743b1";
  movieId: "550e8400-e29b-41d4-a716-446655440000";
}

export type ScreenType = {
  number: number;
  capacity: number;
  theaterId: string;
};

export type ShowtimeWithDetails = {
  id: string;
  startTime: Date;
  endTime: Date;
  availableSeats: number;
  showType: ShowType;
  createdAt: Date;
  updatedAt: Date;
  movie: { id: string; title: string };
  theater: { id: string; name: string };
  screen: { id: string; number: number };
};
