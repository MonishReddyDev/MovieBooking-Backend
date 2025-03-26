/*
  Warnings:

  - A unique constraint covering the columns `[number,theaterId]` on the table `Screen` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Screen_number_theaterId_key" ON "Screen"("number", "theaterId");
