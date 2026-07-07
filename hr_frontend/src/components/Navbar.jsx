import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white shadow px-8 py-4">
      <h2 className="text-xl font-semibold">HR Dashboard</h2>

      <div className="flex items-center gap-5">
        <span>{user?.name}</span>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;