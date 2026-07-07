import Job from "../models/Job.js";
import Candidate from "../models/Candidate.js";

// CREATE JOB
export const createJob = async (req, res) => {
  try {
    const { title, description, skills, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const job = await Job.create({
      title,
      description,
      skills: skills || [],
      status: status,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL JOBS (WITH CANDIDATE COUNT)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    const jobsWithCount = await Promise.all(
      jobs.map(async (job) => {
        const count = await Candidate.countDocuments({ job: job._id });

        return {
          _id: job._id,
          title: job.title,
          description: job.description,
          skills: job.skills,
          status: job.status,
          createdAt: job.createdAt,
          candidateCount: count,
        };
      })
    );

    res.status(200).json(jobsWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = status;

    await job.save();

    res.json({
      message: "Job status updated",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};