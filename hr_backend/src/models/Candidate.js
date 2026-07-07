import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },

    resume: {
      type: String,
    },

    location: {
      type: String,
    },

    currentRole: {
      type: String,
    },

    noticePeriod: {
      type: String,
    },

    salaryExpectation: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Form Submitted",
        "Interview Scheduled",
        "Interview Completed",
        "Offer Sent",
        "Hired",
        "Rejected",
      ],
      default: "Applied",
    },

    timeline: [
      {
        title: {
          type: String,
        },

        description: {
          type: String,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    magicToken: {
      type: String,
    },

    tokenExpiresAt: {
      type: Date,
    },

    isTokenUsed: {
      type: Boolean,
      default: false,
    },

    offerLetter: {
      type: String,
    },

    nda: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;