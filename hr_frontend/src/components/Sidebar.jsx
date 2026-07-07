import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Jobs", path: "/jobs" },
    { name: "Candidates", path: "/candidates" },
    { name: "Interviews", path: "/interviews" },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">ROVE Hire</h1>

      <div className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`block px-4 py-3 rounded-lg ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-slate-700"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;