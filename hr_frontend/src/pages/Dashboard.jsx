import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await api.get("/candidates");
      setCandidates(res.data);
      setFilteredCandidates(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let data = [...candidates];

    if (status !== "All") {
      data = data.filter((c) => c.status === status);
    }

    if (search) {
      data = data.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.job?.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCandidates(data);
  }, [search, status, candidates]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700";

      case "Form Submitted":
        return "bg-indigo-100 text-indigo-700";

      case "Interview Scheduled":
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

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        HR Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Total Candidates</p>
          <h2 className="text-3xl font-bold mt-2">
            {candidates.length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Applied</p>
          <h2 className="text-3xl font-bold mt-2">
            {candidates.filter((c) => c.status === "Applied").length}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Interviews</p>
          <h2 className="text-3xl font-bold mt-2">
            {
              candidates.filter(
                (c) => c.status === "Interview Scheduled"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Hired</p>
          <h2 className="text-3xl font-bold mt-2">
            {candidates.filter((c) => c.status === "Hired").length}
          </h2>
        </div>
      </div>

      {/* Search + Filter */}

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search by candidate or role..."
          className="border rounded-lg px-4 py-3 w-80 bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-3 bg-white"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Form Submitted</option>
          <option>Interview Scheduled</option>
          <option>Offer Sent</option>
          <option>Hired</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Candidate</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Last Activity</th>
            </tr>
          </thead>

          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <tr
                  key={candidate._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {candidate.name}
                  </td>

                  <td className="px-6 py-4">
                    {candidate.job?.title}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        candidate.status
                      )}`}
                    >
                      {candidate.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      candidate.updatedAt
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-8 text-gray-500"
                >
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;