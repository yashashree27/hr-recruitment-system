import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const res = await api.get("/interviews");
      setInterviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Interviews
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Candidate</th>
                <th className="text-left p-4">Job</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Feedback</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((i) => (
                <tr
                  key={i._id}
                  onClick={() => navigate(`/interviews/${i._id}`)}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">
                    {i.candidate?.name}
                  </td>

                  <td className="p-4">
                    {i.candidate?.job?.title}
                  </td>

                  <td className="p-4">
                    {new Date(i.date).toLocaleDateString()} {i.time}
                  </td>

                  <td className="p-4">
                    {i.type}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                        i.status
                      )}`}
                    >
                      {i.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {i.feedback?.decision || "-"}
                  </td>
                </tr>
              ))}

              {interviews.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-6 text-gray-500"
                  >
                    No interviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Interviews;