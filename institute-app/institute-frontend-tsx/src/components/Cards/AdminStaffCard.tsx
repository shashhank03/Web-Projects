import { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig'
import AddInstructer from '../AddCourses/AddInstructer'
import Modal from '../modal/modal'
import { type Staff } from '../Context/AuthContext'

function AdminStaffCard() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [openInstructerPopup, setOpenInstructerPopup] = useState<boolean>(false)
  const [staffID, setStaffID] = useState<number | null>(null)

  useEffect(() => {
    fetchStaff()
  }, [])
  
  const fetchStaff = () => {
    axios.get<Staff[]>('/api/staff')
      .then(res => setStaff(res.data))
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h2 className="text-center text-2xl sm:text-2xl py-4 font-medium">
        Staff & Courses
      </h2>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-300">
            <tr>
              <th className="border px-4 py-2 font-semibold">Staff</th>
              <th className="border px-4 py-2 font-semibold">Courses</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-gray-200">
                <td className="border px-4 py-2 font-semibold">
                  {member.first_name} {member.last_name}
                </td>
                <td className="border px-4 py-2">
                  {Array.isArray(member.courses)
                    ? member.courses.map((c) => c.course_name).join(', ')
                    : member.courses || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-4">
        <button
          className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-full"
          onClick={() => setOpenInstructerPopup(true)}
        >
          Add Courses
        </button>
      </div>

      <Modal isOpenState={openInstructerPopup} onClose={() => setOpenInstructerPopup(false)}>
        <AddInstructer
          setOpenInstructerPopup={setOpenInstructerPopup}
          staffID={staffID}
          setStaffID={setStaffID}
        />
      </Modal>
    </div>
  )
}

export default AdminStaffCard
