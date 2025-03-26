/*
  Warnings:

  - Made the column `theaterId` on table `Showtime` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Showtime" DROP CONSTRAINT "Showtime_theaterId_fkey";

-- AlterTable
ALTER TABLE "Showtime" ALTER COLUMN "theaterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
