import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function InterviewDetails() {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    fetchInterview();
  }, []);

  const fetchInterview = async () => {
    try {
      const res = await api.get(`/interviews/${id}`);
      setInterview(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!interview) {
    return (
      <DashboardLayout>
        <p className="p-8">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Interview Details
        </h1>

        {/* Candidate Info */}
        <div className="space-y-3">
          <p>
            <strong>Candidate:</strong>{" "}
            {interview.candidate?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {interview.candidate?.email}
          </p>

          <p>
            <strong>Job:</strong>{" "}
            {interview.candidate?.job?.title}
          </p>

          <p>
            <strong>Type:</strong> {interview.type}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(interview.date).toLocaleDateString()}
          </p>

          <p>
            <strong>Time:</strong> {interview.time}
          </p>

          <p>
            <strong>Interviewer:</strong>{" "}
            {interview.interviewer}
          </p>

          <p>
            <strong>Status:</strong> {interview.status}
          </p>

          <p>
            <strong>Notes:</strong>{" "}
            {interview.notes || "-"}
          </p>

          {/* Feedback */}
          <hr className="my-6" />

          <h2 className="text-2xl font-bold mb-4">
            Feedback
          </h2>

          <p>
            <strong>Decision:</strong>{" "}
            {interview.feedback?.decision || "-"}
          </p>

          <p>
            <strong>Notes:</strong>{" "}
            {interview.feedback?.notes || "-"}
          </p>

          <p>
            <strong>Completed At:</strong>{" "}
            {interview.feedback?.completedAt
              ? new Date(
                  interview.feedback.completedAt
                ).toLocaleString()
              : "-"}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewDetails;