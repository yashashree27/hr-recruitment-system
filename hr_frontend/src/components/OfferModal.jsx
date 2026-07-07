import { useState } from "react";
import api from "../services/api";

function OfferModal({ candidate, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    role: candidate.job?.title || "",
    salary: "",
    startDate: "",
    manager: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/offers", {
        candidateId: candidate._id,
        ...formData,
      });

      alert("Offer Letter Generated Successfully");

      onSuccess();
      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to generate offer"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl w-[500px] p-8">

        <h2 className="text-2xl font-bold mb-6">
          Generate Offer Letter
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="manager"
            placeholder="Manager Name"
            value={formData.manager}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
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
              className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
            >
              Generate Offer
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default OfferModal;