import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import InterviewModal from "../components/InterviewModal";
import RejectModal from "../components/RejectModal";
import OfferModal from "../components/OfferModal";
import AddCandidateModal from "../components/AddCandidateModal";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Candidates() {
  const [candidates, setCandidates] = useState([]);

  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerCandidate, setOfferCandidate] = useState(null);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectCandidate, setRejectCandidate] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    fetchCandidates();
  }, []);

  const navigate = useNavigate();

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/candidates");
      setCandidates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- HIRE ----------------
  const handleHire = async (candidateId) => {
    const confirmed = window.confirm(
      "Are you sure you want to hire this candidate?"
    );

    if (!confirmed) return;

    try {
      const res = await api.post("/candidate-status/hire", {
        candidateId,
      });

      alert(res.data.message);
      fetchCandidates();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to hire candidate");
    }
  };

  // ---------------- STATUS COLORS ----------------
  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";
      case "Interview Scheduled":
      case "Interview Completed":
        return "bg-yellow-100 text-yellow-700";
      case "Offer Sent":
        return "bg-purple-100 text-purple-700";
      case "Hired":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ---------------- STATE MACHINE ----------------
  const getAllowedActions = (status) => {
    return {
      canInterview: status === "Form Submitted",

      canOffer: status === "Interview Completed",

      // ONLY allow hire if Offer exists AND NOT already final
      canHire: status === "Offer Sent",

      canReject: status !== "Hired" && status !== "Rejected",
    };
  };

  // ---------------- MODALS ----------------
  const openInterviewModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowInterviewModal(true);
  };

  const openOfferModal = (candidate) => {
    setOfferCandidate(candidate);
    setShowOfferModal(true);
  };

  const openRejectModal = (candidate) => {
    setRejectCandidate(candidate);
    setShowRejectModal(true);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Candidates</h1>
          <p className="text-gray-500">Manage all applicants.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Candidate
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Name</th>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Job</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => {
              const actions = getAllowedActions(candidate.status);

              return (
                <tr
                  key={candidate._id}
                  onClick={() => navigate(`/candidates/${candidate._id}`)}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  {/* Name */}
                  <td className="px-6 py-4 font-medium">
                    {candidate.name}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">{candidate.email}</td>

                  {/* Job */}
                  <td className="px-6 py-4">
                    {candidate.job?.title}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        candidate.status
                      )}`}
                    >
                      {candidate.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">

                      {/* Resume */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(
                            `${API_URL}/${candidate.resume.replace("src/", "")}`,
                            "_blank"
                          );
                        }}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Resume
                      </button>

                      {/* Interview */}
                      {actions.canInterview && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openInterviewModal(candidate);
                          }}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        >
                          Interview
                        </button>
                      )}

                      {/* Offer */}
                      <button
                        disabled={!actions.canOffer}
                        onClick={(e) => {
                          e.stopPropagation();
                          openOfferModal(candidate);
                        }}
                        className={`px-3 py-1 rounded text-white ${actions.canOffer
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Offer
                      </button>

                      {/* Hire */}
                      <button
                        disabled={!actions.canHire}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHire(candidate._id);
                        }}
                        className={`px-3 py-1 rounded text-white ${actions.canHire
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Hire
                      </button>

                      {/* Reject */}
                      <button
                        disabled={!actions.canReject}
                        onClick={(e) => {
                          e.stopPropagation();
                          openRejectModal(candidate);
                        }}
                        className={`px-3 py-1 rounded text-white ${actions.canReject
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {candidates.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500"
                >
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ---------------- MODALS ---------------- */}

      {showInterviewModal && selectedCandidate && (
        <InterviewModal
          candidate={selectedCandidate}
          onClose={() => {
            setShowInterviewModal(false);
            setSelectedCandidate(null);
          }}
          onSuccess={fetchCandidates}
        />
      )}

      {showOfferModal && offerCandidate && (
        <OfferModal
          candidate={offerCandidate}
          onClose={() => {
            setShowOfferModal(false);
            setOfferCandidate(null);
          }}
          onSuccess={fetchCandidates}
        />
      )}

      {showRejectModal && rejectCandidate && (
        <RejectModal
          candidate={rejectCandidate}
          onClose={() => {
            setShowRejectModal(false);
            setRejectCandidate(null);
          }}
          onSuccess={fetchCandidates}
        />
      )}

      {showAddModal && (
        <AddCandidateModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchCandidates}
        />
      )}
    </DashboardLayout>
  );
}

export default Candidates;