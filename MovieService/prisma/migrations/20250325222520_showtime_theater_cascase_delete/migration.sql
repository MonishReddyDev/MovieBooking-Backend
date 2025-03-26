-- DropForeignKey
ALTER TABLE "Showtime" DROP CONSTRAINT "Showtime_theaterId_fkey";

-- AddForeignKey
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE CASCADE ON UPDATE CASCADE;
