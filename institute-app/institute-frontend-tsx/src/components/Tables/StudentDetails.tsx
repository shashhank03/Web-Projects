import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import AddUser from '../AddUser/AddUser';
import EditUser from '../AddUser/EditUser';
import Modal from '../modal/modal';
import { useAuth } from '../Context/AuthContext';
import type { Student } from '../Context/AuthContext';

const StudentDetails: React.FC = () => {
	const [students, setStudents] = useState<Student[]>([]);
	const [openAddUserPopup, setOpenAddUserPopup] = useState<boolean>(false);
	const [openEditUserPopup, setOpenEditUserPopup] = useState<boolean>(false);
	const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		fetchStudents();
	}, []);

	const fetchStudents = () => {
		axios.get('/api/students')
			.then(res => setStudents(res.data))
			.catch(err => console.error(err));
	};

	const handleDelete = async (studentId: number) => {
		if (window.confirm('Are you sure you want to delete this student?')) {
			try {
				await axios.delete(`/api/students/${studentId}`);
				setStudents(students.filter(student => student.id !== studentId));
				alert('Student deleted successfully');
			} catch (err) {
				console.error('Delete error:', err);
				alert('Failed to delete student');
			}
		}
	};

	const handleEdit = (student: Student) => {
		setSelectedStudent(student);
		setOpenEditUserPopup(true);
	};

	return (
		<div className='flex flex-col min-h-screen'>
			{user?.role==='Admin' ?(
					<div className='flex justify-between items-center mb-4 mt-8'>
							<div></div>
							<h2 className="text-2xl font-bold">Students</h2>
								<button
									onClick={() => setOpenAddUserPopup(true)}
									className="text-white bg-red-700 hover:bg-red-800 rounded-lg px-4 py-3"
								>
									Add Student
								</button>
					</div>
			):(
					<div className='flex justify-between items-center mb-4 mt-8'>
							<div></div>
							<h2 className="text-2xl font-bold">Students</h2>
							<div></div>
					</div>
			)}
			<div className=" overflow-x-auto ">
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
							{user?.role==='Admin' && (<th className="border px-4 py-2 ">Actions</th>)}
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr key={student.id} className="hover:bg-gray-200">
								<td className="border px-4 py-2">
									{student.first_name} {student.last_name}
								</td>
								<td className="border px-4 py-2">{student.email}</td>
								<td className="border px-4 py-2">{student.phone_number}</td>
								<td className="border px-4 py-2">{student.gender}</td>
								<td className="border px-4 py-2">
									{student.date_of_birth?.split("T")[0]}
								</td>
								<td className="border px-4 py-2">
									{student.address ? `${student.address.street}, ${student.address.city}, ${student.address.state} - ${student.address.pin_code}, ${student.address.country}` : 'No Address Available'}
								</td>
								<td className="border px-4 py-2">{student.courses?.map(course => course.course_name).join(', ') || '-'}</td>
								{user?.role==='Admin' && (
									<td className="border px-4 py-2">
										<div className="flex gap-2">
											<button
												className="bg-blue-500 hover:bg-blue-800 text-white px-2 py-2 material-icons rounded-full"
												onClick={() => handleEdit(student)}
												title="Edit Student"
											>
												&#xe3c9;
											</button>
											<button
											className="bg-red-700 hover:bg-red-800 text-white px-2 py-2 material-icons rounded-full"
											onClick={() => handleDelete(student.user_id as number)}
											title="Delete Student"
										>
											&#xe872;
										</button>
									</div>
								</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Modal isOpenState={openAddUserPopup} onClose={() => setOpenAddUserPopup(false)}>
				<h2 className='text-2xl font-medium mb-6 text-center'>Add Student</h2>
				<AddUser setOpenAddUserPopup={setOpenAddUserPopup} role='Student' />
			</Modal>
			<Modal isOpenState={openEditUserPopup} onClose={() => setOpenEditUserPopup(false)}>
				<EditUser 
					setEditUserPopup={setOpenEditUserPopup} 
					userToEdit={selectedStudent}
					onUpdate={fetchStudents}
				/>
			</Modal>
		</div>
	);
};

export default StudentDetails;
