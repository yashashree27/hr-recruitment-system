import { useState } from "react";
import api from "../services/api";

function InterviewModal({ candidate, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        type: "Screening",
        interviewer: "",
        notes: "",
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
            await api.post("/interviews", {
                candidateId: candidate._id,
                ...formData,
            });

            alert("Interview scheduled successfully");

            onSuccess();
            onClose();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to schedule interview"
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xl w-[500px] p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Schedule Interview
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >
                        <option value="Screening">Screening</option>
                        <option value="Technical">Technical</option>
                    </select>

                    <input
                        type="text"
                        name="interviewer"
                        placeholder="Interviewer Name"
                        value={formData.interviewer}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border rounded-lg p-3"
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
                            className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600"
                        >
                            Schedule
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}

export default InterviewModal;