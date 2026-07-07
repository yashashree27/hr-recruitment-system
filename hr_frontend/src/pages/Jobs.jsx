import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateJobModal from "../components/CreateJobModal";
import api from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Jobs</h1>
          <p className="text-gray-500 mt-1">
            Manage all job openings.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Create Job
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4">Title</th>
              <th className="text-left px-6 py-4">Description</th>
              <th className="text-left px-6 py-4">Skills</th>
              <th className="text-left px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold">
                    {job.title}
                  </td>

                  <td className="px-6 py-4">
                    {job.description}
                  </td>

                  <td className="px-6 py-4">
  {Array.isArray(job.skills)
    ? job.skills.join(", ")
    : job.skills || "-"}
</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-10 text-gray-500"
                >
                  No jobs available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
  <CreateJobModal
    onClose={() => setShowModal(false)}
    onJobCreated={fetchJobs}
  />
)}
    </DashboardLayout>
  );
}

export default Jobs;