import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function CandidateProfile() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);


  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const res = await api.get(`/candidates/${id}`);
      setCandidate(res.data.candidate);
    } catch (error) {
      console.log(error);
    }
  };

  if (!candidate) {
    return (
      <DashboardLayout>
        <p className="p-8">Loading...</p>
      </DashboardLayout>
    );
  }

  const API_URL = import.meta.env.VITE_API_URL;

  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    return `${API_URL}/${filePath.replace("src/", "")}`;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6">
          Candidate Profile
        </h1>

        <div className="space-y-3">
          <p>
            <strong>Name:</strong> {candidate.name}
          </p>

          <p>
            <strong>Email:</strong> {candidate.email}
          </p>

          <p>
            <strong>Phone:</strong> {candidate.phone || "-"}
          </p>

          <p>
            <strong>Job:</strong> {candidate.job?.title}
          </p>

          <p>
            <strong>Status:</strong> {candidate.status}
          </p>

          <p>
            <strong>Location:</strong> {candidate.location || "-"}
          </p>

          <p>
            <strong>Current Role:</strong> {candidate.currentRole || "-"}
          </p>

          <p>
            <strong>Notice Period:</strong> {candidate.noticePeriod || "-"}
          </p>

          <p>
            <strong>Salary Expectation:</strong>{" "}
            {candidate.salaryExpectation || "-"}
          </p>

          <p>
            <strong>LinkedIn:</strong>{" "}
            {candidate.linkedin ? (
              <a
                href={candidate.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Profile
              </a>
            ) : (
              "-"
            )}
          </p>

          <div className="pt-4 flex gap-3 flex-wrap">
            {candidate.resume && (
              <button
                onClick={() => window.open(getFileUrl(candidate.resume), "_blank")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download Resume
              </button>
            )}

            {candidate.offerLetter && (
              <button
                onClick={() =>
                  window.open(getFileUrl(candidate.offerLetter), "_blank")
                }
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Download Offer Letter
              </button>
            )}
            {candidate.nda && (
              <button
                onClick={() =>
                  window.open(getFileUrl(candidate.nda), "_blank")
                }
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Download NDA
              </button>
            )}
          </div>
          <hr className="my-8" />

          <h2 className="text-2xl font-bold mb-5">
            Timeline
          </h2>

          <div className="space-y-4">
            {candidate.timeline?.length ? (
              candidate.timeline
                .slice()
                .reverse()
                .map((event) => (
                  <div
                    key={event._id}
                    className="border-l-4 border-blue-600 pl-4 py-3 bg-gray-50 rounded"
                  >
                    <h3 className="font-semibold">
                      {event.title}
                    </h3>

                    <p className="text-gray-600">
                      {event.description}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(event.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
            ) : (
              <p>No timeline available.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CandidateProfile;