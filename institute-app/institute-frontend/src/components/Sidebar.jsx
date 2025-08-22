import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Tables",
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Students", url: "/students" },
        { title: "Staff", url: "/staff" },
        { title: "Courses", url: "/courses" },
        
      ],
    },
  ],
};

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-screen w-1/7 p-4 pt-12  border-r border-gray-200 bg-gray-800 text-white">
      {/* <div className="mb-4">
        <input
          type="search"
          placeholder="Search..."
          className="w-full mt-4 px-3 py-2 border border-gray-300 bg-gray-700 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div> */}

      {data.navMain.map((group) => (
        <div key={group.title} className="mb-6">
          <div className="text-lg font-serif mb-2  "></div>
          <ul className="space-y-1">
          {group.items.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 rounded-md transition-colors ${
                      isActive
                        ? "font-bold text-gray-900 bg-gray-200"
                        : "text-white hover:text-gray-900 hover:bg-gray-200"
                    }`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
