import crypto from "crypto";
import Candidate from "../models/Candidate.js";
import Interview from "../models/Interview.js";
import Job from "../models/Job.js";

export const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, job } = req.body;

    if (!name || !email || !job) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const existing = await Candidate.findOne({ email, job });

    if (existing) {
      return res.status(400).json({
        message: "Candidate already exists for this job",
      });
    }

    // Check job exists and is open
    const selectedJob = await Job.findById(job);

    if (!selectedJob) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (selectedJob.status === "Closed") {
      return res.status(400).json({
        message: "Cannot add candidate to a closed job",
      });
    }

    // Generate magic token
    const token = crypto.randomUUID();

    // Set expiry (14 days)
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 14);

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      job,
      resume: req.file.path,

      magicToken: token,
      tokenExpiresAt: expiry,
      isTokenUsed: false,
      timeline: [
        {
          title: "Applied",
          description: "Candidate was added by HR",
        },
      ],
    });

    //  Create magic link
    const magicLink = `http://localhost:5173/candidate-form/${token}`;

    res.status(201).json({
      message: "Candidate created successfully",
      magicLink,
      candidate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate("job", "title")
      .sort({ createdAt: -1 });

    res.json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
      .populate("job", "title");

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    const interviews = await Interview.find({
      candidate: candidate._id,
    }).sort({ createdAt: -1 });

    res.json({
      candidate,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const submitCandidateForm = async (req, res) => {
  try {
    const { token } = req.params;

    const {
      phone,
      currentLocation,
      currentRole,
      noticePeriod,
      salaryExpectation,
      linkedin,
    } = req.body;

    const candidate = await Candidate.findOne({ magicToken: token });

    if (!candidate) {
      return res.status(404).json({ message: "Invalid link" });
    }


    if (candidate.tokenExpiresAt < new Date()) {
      return res.status(400).json({ message: "Link expired" });
    }


    if (candidate.isTokenUsed) {
      return res.status(400).json({ message: "Link already used" });
    }


    candidate.phone = phone;
    candidate.location = currentLocation;
    candidate.currentRole = currentRole;
    candidate.noticePeriod = noticePeriod;
    candidate.salaryExpectation = salaryExpectation;
    candidate.linkedin = linkedin;


    candidate.isTokenUsed = true;

    candidate.status = "Form Submitted";

    candidate.timeline.push({
      title: "Form Submitted",
      description: "Candidate completed the application form",
      createdAt: new Date(),
    });

    await candidate.save();

    return res.json({
      message: "Form submitted successfully",
      candidate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};