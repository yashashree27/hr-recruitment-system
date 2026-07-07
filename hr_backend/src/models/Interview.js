import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
    {
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: ["Screening", "Technical"],
            required: true,
        },

        interviewer: {
            type: String,
            required: true,
        },

        notes: {
            type: String,
        },

        status: {
            type: String,
            enum: ["Scheduled", "Completed"],
            default: "Scheduled",
        },
        feedback: {
            decision: {
                type: String,
                enum: ["Hire Recommendation", "No-Hire", "Maybe"],
            },
            notes: String,
            completedAt: Date,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);