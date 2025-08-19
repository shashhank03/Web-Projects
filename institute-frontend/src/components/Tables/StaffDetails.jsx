import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffDetails = () => {
  const [staff, setstaff] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/staff')
      .then(res => setstaff(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Staff Details</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="border px-4 py-2 ">Name</th>
              <th className="border px-4 py-2 ">Email</th>
              <th className="border px-4 py-2 ">Phone</th>
              <th className="border px-4 py-2 ">Gender</th>
              <th className="border px-4 py-2 ">DOB</th>
              <th className="border px-4 py-2 ">Address</th>
              <th className="border px-4 py-2 ">Courses</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((Staff) => (
              <tr key={Staff.id} className="hover:bg-gray-200">
                <td className="border px-4 py-2">
                  {Staff.first_name} {Staff.last_name}
                </td>
                <td className="border px-4 py-2">{Staff.email}</td>
                <td className="border px-4 py-2">{Staff.phone_number}</td>
                <td className="border px-4 py-2">{Staff.gender}</td>
                <td className="border px-4 py-2">{Staff.date_of_birth?.split("T")[0]}</td>
                <td className="border px-4 py-2">
                  {Staff.street}, {Staff.city}, {Staff.state} -{" "}
                  {Staff.pin_code}, {Staff.country}
                </td>
                <td className="border px-4 py-2">{Staff.courses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default StaffDetails;
