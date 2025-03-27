-- CreateIndex
CREATE INDEX "Movie_releaseDate_title_genres_ratings_idx" ON "Movie"("releaseDate", "title", "genres", "ratings");

-- CreateIndex
CREATE INDEX "Screen_theaterId_idx" ON "Screen"("theaterId");

-- CreateIndex
CREATE INDEX "Showtime_startTime_idx" ON "Showtime"("startTime");

-- CreateIndex
CREATE INDEX "Showtime_movieId_idx" ON "Showtime"("movieId");

-- CreateIndex
CREATE INDEX "Showtime_theaterId_idx" ON "Showtime"("theaterId");

-- CreateIndex
CREATE INDEX "Showtime_screenId_idx" ON "Showtime"("screenId");

-- CreateIndex
CREATE INDEX "Theater_location_name_idx" ON "Theater"("location", "name");
