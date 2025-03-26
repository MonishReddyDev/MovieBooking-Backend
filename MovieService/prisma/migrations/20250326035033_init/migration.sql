/*
  Warnings:

  - A unique constraint covering the columns `[movieId,theaterId,startTime,screenId]` on the table `Showtime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `screenId` to the `Showtime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showType` to the `Showtime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShowType" AS ENUM ('MORNING_SHOW', 'MATINEE_SHOW', 'FIRST_SHOW', 'SECOND_SHOW', 'BENEFIT_SHOW');

-- DropIndex
DROP INDEX "Showtime_movieId_theaterId_startTime_key";

-- AlterTable
ALTER TABLE "Showtime" ADD COLUMN     "screenId" TEXT NOT NULL,
ADD COLUMN     "showType" "ShowType" NOT NULL;

-- CreateTable
CREATE TABLE "Screen" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "theaterId" TEXT NOT NULL,

    CONSTRAINT "Screen_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Showtime_movieId_theaterId_startTime_screenId_key" ON "Showtime"("movieId", "theaterId", "startTime", "screenId");

-- AddForeignKey
ALTER TABLE "Screen" ADD CONSTRAINT "Screen_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE CASCADE ON UPDATE CASCADE;
