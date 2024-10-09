import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("radio taiso zo API");
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});