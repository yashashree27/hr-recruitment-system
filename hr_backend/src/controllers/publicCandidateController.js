import Candidate from "../models/Candidate.js";

export const submitCandidateForm = async (req, res) => {
  try {
    const { token } = req.params;

    const {
      phone,
      location,
      currentRole,
      noticePeriod,
      salaryExpectation,
      linkedin,
    } = req.body;

    // 1. find candidate by token
    const candidate = await Candidate.findOne({ magicToken: token });

    if (!candidate) {
      return res.status(404).json({ message: "Invalid link" });
    }

    // 2. check expired
    if (candidate.tokenExpiresAt < new Date()) {
      return res.status(400).json({ message: "Link expired" });
    }

    // 3. check already used
    if (candidate.isTokenUsed) {
      return res.status(400).json({ message: "Link already used" });
    }

    // 4. update candidate details
    candidate.phone = phone;
    candidate.location = location;
    candidate.currentRole = currentRole;
    candidate.noticePeriod = noticePeriod;
    candidate.salaryExpectation = salaryExpectation;
    candidate.linkedin = linkedin;

    // 5. mark as submitted
    candidate.status = "Form Submitted";
    candidate.isTokenUsed = true;

    await candidate.save();

    res.json({
      message: "Form submitted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};