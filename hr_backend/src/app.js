import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import candidateStatusRoutes from "./routes/candidateStatusRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/candidate-status", candidateStatusRoutes);

export default app;