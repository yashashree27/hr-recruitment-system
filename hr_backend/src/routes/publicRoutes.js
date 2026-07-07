import express from "express";
import Candidate from "../models/Candidate.js";

const router = express.Router();

// GET magic link validation
router.get("/candidate/:token", async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ magicToken: req.params.token });

    if (!candidate) return res.status(404).json({ message: "Invalid link" });

    if (candidate.isTokenUsed)
      return res.status(400).json({ message: "Link already used" });

    if (candidate.tokenExpiresAt < new Date())
      return res.status(400).json({ message: "Link expired" });

    res.json({ message: "Valid link" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST submit form
router.post("/candidate/:token", async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ magicToken: req.params.token });

    if (!candidate) return res.status(404).json({ message: "Invalid link" });

    if (candidate.isTokenUsed)
      return res.status(400).json({ message: "Link already used" });

    if (candidate.tokenExpiresAt < new Date())
      return res.status(400).json({ message: "Link expired" });

    Object.assign(candidate, req.body);

    candidate.status = "Form Submitted";
    candidate.isTokenUsed = true;

    candidate.timeline.push({
      title: "Form Submitted",
      description: "Candidate completed the application form",
    });

    await candidate.save();

    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;