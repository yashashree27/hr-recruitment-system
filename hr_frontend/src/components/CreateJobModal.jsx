import { useState } from "react";
import api from "../services/api";

function CreateJobModal({ onClose, onJobCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    status: "Open",
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
      await api.post("/jobs", {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim()),
      });

      onJobCreated();
      onClose();
    } catch (error) {
      console.log(error);
      alert("Failed to create job");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl w-[500px] p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6">
          Create New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="React, Node, JavaScript"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Open</option>
            <option>Closed</option>
          </select>

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Job
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateJobModal;