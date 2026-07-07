import Candidate from "../models/Candidate.js";

// ---------------- HIRE CANDIDATE ----------------
export const markAsHired = async (req, res) => {
  try {
    const { candidateId } = req.body;

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // prevent duplicate timeline entries
    const alreadyHired = candidate.timeline.some(
      (t) => t.title === "Hired"
    );

    if (alreadyHired) {
      return res.status(400).json({ message: "Already hired" });
    }

    // 1. update status
    candidate.status = "Hired";

    // 2. add timeline entry (THIS WAS THE ISSUE)
    candidate.timeline.push({
      title: "Hired",
      description: "Candidate has been marked as hired",
      createdAt: new Date(),
    });

    await candidate.save();

    res.json({
      message: "Candidate marked as hired",
      candidate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- REJECT CANDIDATE ----------------
export const markAsRejected = async (req, res) => {
  try {
    const { candidateId, reason } = req.body;

    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    candidate.status = "Rejected";
    candidate.rejectionReason = reason;

    await candidate.save();

    res.json({
      message: "Candidate marked as Rejected",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};