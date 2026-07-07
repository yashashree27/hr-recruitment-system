import { useState } from "react";
import api from "../services/api";

function RejectModal({ candidate, onClose, onSuccess }) {
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/candidate-status/reject", {
        candidateId: candidate._id,
        reason,
      });

      alert(res.data.message);

      onSuccess();
      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to reject candidate"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-[500px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Reject Candidate
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <textarea
            rows="5"
            placeholder="Reason for rejection..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
            >
              Reject
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default RejectModal;