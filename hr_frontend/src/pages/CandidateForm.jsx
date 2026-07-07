import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function CandidateForm() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [candidate, setCandidate] = useState(null);

  const [form, setForm] = useState({
    phone: "",
    location: "",
    currentRole: "",
    noticePeriod: "",
    salaryExpectation: "",
    linkedin: "",
  });

  // 1. validate token
  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const res = await api.get(`/public/candidate/${token}`);
      setCandidate(res.data.candidate);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired link");
      setLoading(false);
    }
  };

  // 2. submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(`/public/candidate/${token}`, form);
      setSuccess(true);
    } catch (err) {
      setError("Submission failed");
    }
  };

  // ---------------- UI STATES ----------------

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  if (success) {
    return (
      <div className="h-screen flex items-center justify-center text-green-600 text-xl">
        Form submitted successfully 🎉
      </div>
    );
  }

  // ---------------- FORM UI ----------------

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-2">
          Complete Your Application
        </h1>

        <p className="text-gray-500 mb-6">
          Welcome {candidate?.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border p-3 rounded"
            placeholder="Phone"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            required
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Location"
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
            required
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Current Role"
            onChange={(e) =>
              setForm({ ...form, currentRole: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Notice Period"
            onChange={(e) =>
              setForm({ ...form, noticePeriod: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="Salary Expectation"
            onChange={(e) =>
              setForm({ ...form, salaryExpectation: e.target.value })
            }
          />

          <input
            className="w-full border p-3 rounded"
            placeholder="LinkedIn URL"
            onChange={(e) =>
              setForm({ ...form, linkedin: e.target.value })
            }
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default CandidateForm;