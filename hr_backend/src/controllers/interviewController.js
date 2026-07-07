import Interview from "../models/Interview.js";
import Candidate from "../models/Candidate.js";

export const scheduleInterview = async (req, res) => {
  try {
    const { candidateId, date, time, type, interviewer, notes } = req.body;

    // 1. check candidate exists
    const candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // 2. create interview
    const interview = await Interview.create({
      candidate: candidateId,
      date,
      time,
      type,
      interviewer,
      notes,
    });

    // 3. update candidate status
    candidate.status = "Interview Scheduled";

    candidate.timeline.push({
      title: "Interview Scheduled",
      description: `${type} interview scheduled on ${new Date(date).toLocaleDateString()} at ${time}`,
    });

    await candidate.save();

    res.status(201).json({
      message: "Interview scheduled successfully",
      interview,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const completeInterview = async (req, res) => {
  try {
    const { interviewId, decision, notes } = req.body;

    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.status === "Completed") {
      return res.status(400).json({
        message: "Interview already completed",
      });
    }

    if (decision === "No-Hire") {
      newStatus = "Rejected";
      title = "Rejected after interview";
    }

    interview.status = "Completed";

    interview.feedback = {
      decision,
      notes,
      completedAt: new Date(),
    };

    const candidate = await Candidate.findById(interview.candidate);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    let newStatus = "Interview Completed";
    let title = "Interview Completed";

    if (decision === "No-Hire") {
      newStatus = "Rejected";
      title = "Rejected after interview";
    }

    candidate.status = newStatus;

    candidate.timeline.push({
      title,
      description: `Recommendation: ${decision}. ${notes || ""}`,
      createdAt: new Date(),
    });

    await candidate.save();
    await interview.save();

    res.json({
      message: "Interview marked as completed",
      interview,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate({
        path: "candidate",
        populate: {
          path: "job",
          select: "title",
        },
      })
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate({
        path: "candidate",
        populate: {
          path: "job",
        },
      });

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};