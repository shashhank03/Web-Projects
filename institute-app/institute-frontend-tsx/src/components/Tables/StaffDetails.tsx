import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import AddUser from '../AddUser/AddUser';
import Modal from '../modal/modal';
import EditUser from '../AddUser/EditUser';
import { useAuth } from '../Context/AuthContext';
import type { Staff } from '../Context/AuthContext';

const StaffDetails: React.FC = () => {
	const [staff, setstaff] = useState<Staff[]>([]);
	const [openAddUserPopup, setOpenAddUserPopup] = useState<boolean>(false);
	const [openEditUserPopup, setOpenEditUserPopup] = useState<boolean>(false);
	const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		fetchStaff();
	}, []);

	const fetchStaff = () => {
		axios.get('/api/staff')
			.then(res => setstaff(res.data))
			.catch(err => console.error(err));
	};

	const handleDelete = async (staffId: number) => {
		if (window.confirm('Are you sure you want to delete this staff member?')) {
			try {
				await axios.delete(`/api/staff/${staffId}`);
				setstaff(staff.filter(s => s.user_id !== staffId));
				alert('Staff deleted successfully');
			} catch (err) {
				console.error('Delete error:', err);
				alert('Failed to delete staff');
			}
		}
	};

	const handleEdit = (staffMember: Staff) => {
		setSelectedStaff(staffMember);
		setOpenEditUserPopup(true);
	};

	return (
		<div className='flex flex-col min-h-screen'>
			{user?.role==='Admin' ?(
				<div className='flex justify-between items-center mb-4 mt-8'>
					<div></div>
						<h2 className="text-2xl font-bold">Staff</h2>
							<button
								onClick={() => setOpenAddUserPopup(true)}
								className="text-white bg-orange-700 hover:bg-orange-800 rounded-lg px-4 py-3"
							>
								Add Staff
							</button>
				</div>
			):(
				<div className='flex justify-between items-center mb-4 mt-8'>
						<div></div>
						<h2 className="text-2xl font-bold">Staff</h2>
						<div></div>
				</div>
			)}
      
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
							{user?.role==='Admin' && (<th className="border px-4 py-2 ">Actions</th>)}
						</tr>
					</thead>
					<tbody>
						{staff.map((Staff) => (
							<tr key={Staff.user_id} className="hover:bg-gray-200">
								<td className="border px-4 py-2">
									{Staff.first_name} {Staff.last_name}
								</td>
								<td className="border px-4 py-2">{Staff.email}</td>
								<td className="border px-4 py-2">{Staff.phone_number}</td>
								<td className="border px-4 py-2">{Staff.gender}</td>
								<td className="border px-4 py-2">{Staff.date_of_birth?.split("T")[0]}</td>
								<td className="border px-4 py-2">
									{Staff.address ? `${Staff.address.street}, ${Staff.address.city}, ${Staff.address.state} - ${Staff.address.pin_code}, ${Staff.address.country}` : 'No Address Available'}
								</td>
								<td className="border px-4 py-2">{Staff.courses?.map(course => course.course_name).join(', ') || '-'}</td>
								{user?.role==='Admin' && (
									<td className="border px-4 py-2">
										<div className="flex gap-2">
											<button
												className="bg-blue-500 hover:bg-blue-800 text-white px-2 py-2 material-icons rounded-full"
												onClick={() => handleEdit(Staff)}
												title="Edit Staff"
											>
											&#xe3c9;
											</button>
											<button
												className="bg-red-700 hover:bg-red-800 text-white px-2 py-2 material-icons rounded-full"
												onClick={() => handleDelete(Staff.user_id as number)}
												title="Delete Staff"
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
				<h2 className='text-2xl font-medium mb-6 text-center'>Add Staff</h2>
				<AddUser setOpenAddUserPopup={setOpenAddUserPopup} role='Staff' />
			</Modal>
      
			<Modal isOpenState={openEditUserPopup} onClose={() => setOpenEditUserPopup(false)}>
				<EditUser 
					setEditUserPopup={setOpenEditUserPopup} 
					userToEdit={selectedStaff}
					onUpdate={fetchStaff}
				/>
			</Modal>
		</div>
	);
};

export default StaffDetails;
