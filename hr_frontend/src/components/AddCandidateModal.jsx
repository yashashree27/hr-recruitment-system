import { useEffect, useState } from "react";
import api from "../services/api";

function AddCandidateModal({ onClose, onSuccess }) {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    resume: null,
  });

  const [loading, setLoading] = useState(false);
  const [magicLink, setMagicLink] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("job", form.job);
      data.append("resume", form.resume);

      const res = await api.post("/candidates", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMagicLink(res.data.magicLink);
      onSuccess?.();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create candidate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] p-6 rounded-xl shadow-lg">

        <h2 className="text-xl font-bold mb-4">Add Candidate</h2>

        {!magicLink ? (
          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              name="name"
              placeholder="Name"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              className="w-full border p-2 rounded"
              onChange={handleChange}
            />

            {/* JOB DROPDOWN */}
            <select
              name="job"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            >
              <option value="">Select Job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>

            {/* RESUME */}
            <input
              type="file"
              accept="application/pdf"
              className="w-full border p-2 rounded"
              onChange={handleFileChange}
              required
            />

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>

          </form>
        ) : (
          /* MAGIC LINK UI (IMPORTANT FOR ASSIGNMENT) */
          <div>
            <p className="text-green-600 font-semibold mb-2">
              Candidate created successfully 🎉
            </p>

            <div className="bg-gray-100 p-3 rounded break-all text-sm">
              {magicLink}
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(magicLink);
                alert("Copied!");
              }}
              className="mt-3 bg-black text-white px-3 py-2 rounded"
            >
              Copy Link
            </button>

            <button
              onClick={onClose}
              className="ml-2 px-3 py-2 border rounded"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default AddCandidateModal;