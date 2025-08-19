import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "Tables",
      items: [
        { title: "Student Details", url: "/students" },
        { title: "Staff Details", url: "/staff" },
        { title: "Course Details", url: "/courses" },
      ],
    },
  ],
};

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 h-screen w-64 p-8 border-r border-gray-200 bg-white z-10 ">
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {data.navMain.map((group) => (
        <div key={group.title} className="mb-6">
          <div className="text-lg font-semibold mb-2">{group.title}</div>
          <ul className="space-y-1">
          {group.items.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `block px-2 py-1 rounded-md transition-colors ${
                      isActive
                        ? "font-bold text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
