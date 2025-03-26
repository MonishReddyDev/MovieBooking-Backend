-- DropForeignKey
ALTER TABLE "Showtime" DROP CONSTRAINT "Showtime_theaterId_fkey";

-- AlterTable
ALTER TABLE "Showtime" ALTER COLUMN "theaterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE SET NULL ON UPDATE CASCADE;
