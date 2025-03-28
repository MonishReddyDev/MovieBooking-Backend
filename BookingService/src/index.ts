// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = process.env.PORT || 3001;

const prisma = new PrismaClient();

app.use(express.json());

// Set up routes
app.use("/api/bookings", (req, res) => {
  res.send("Hello from Booking Service");
});

app.listen(PORT, () => {
  console.log("Booking service running on port", PORT);
});
