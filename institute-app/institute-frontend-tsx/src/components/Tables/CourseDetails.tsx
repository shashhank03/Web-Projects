import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import AddCourse from '../AddCourses/AddCourse';
import Modal from '../modal/modal';
import EditCourse from '../EditCourse/EditCourse';
import { useAuth } from '../Context/AuthContext';
import type { Batch } from '../Context/AuthContext';

type CourseWithBatches = {
	id?: number;
	course_name?: string;
	course_code?: number;
	description?: string;
	duration?: string;
	status?: string;
	batches?: Batch[];
};

const CourseDetails: React.FC = () => {
	const [openCoursePopup, setOpenCoursePopup] = useState<boolean>(false);
	const [openEditCoursePopup, setOpenEditCoursePopup] = useState<boolean>(false);
	const [courses, setCourses] = useState<CourseWithBatches[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<CourseWithBatches | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		fetchCourses();
	}, []);

	const fetchCourses = () => {
		axios.get('/api/courses')
		  .then(res => setCourses(res.data))
		  .catch(err => console.error(err));
	};

	const handleDelete = async (courseId: number) => {
		if (window.confirm('Are you sure you want to delete this course?')) {
			try {
				await axios.delete(`/api/courses/${courseId}`);
				setCourses(courses.filter(course => course.id !== courseId));
				alert('Course deleted successfully');
			} catch (err) {
				console.error('Delete error:', err);
				alert('Failed to delete course');
			}
		}
	};

	const handleEdit = (course: CourseWithBatches) => {
		setSelectedCourse(course);
		setOpenEditCoursePopup(true);
	};

	return (
		<>
		<div className='flex flex-col min-h-screen'>
			{user?.role==='Admin' ?(
				<div className='flex justify-between items-center mb-4 mt-8'>
					<div></div>
					<h2 className="text-2xl font-bold">Courses</h2>
					<button
						onClick={() => setOpenCoursePopup(true)}
						className="text-white bg-orange-700 hover:bg-orange-800 rounded-lg px-4 py-3"
					>
						Add Course
					</button>
				</div>
			):(
				<div className='flex justify-between items-center mb-4 mt-8'>
					<div></div>
					<h2 className="text-2xl font-bold">Courses</h2>
					<div></div>
				</div>
			)}
			<div className='overflow-x-auto'>
				<table className='min-w-full border border-gray-300'>
					<thead  className='bg-gray-300'>
						<tr>
							<th className='border px-4 py-2'>Course Name</th>
							<th className='border px-4 py-2'>Course Code</th>
							<th className='border px-4 py-2'>Description</th>
							<th className='border px-4 py-2'>Duration</th>
							<th className='border px-4 py-2'>Batches</th>
							{user?.role==='Admin' && (<th className='border px-4 py-2'>Actions</th>)}
						</tr>
					</thead>
					<tbody>
						{courses.map((course) => (
							<tr key={course.id} className='hover:bg-gray-200'>
								<td className='border px-4 py-2'>{course.course_name}</td>
								<td className='border px-4 py-2'>{course.course_code}</td>
								<td className='border px-4 py-2'>{course.description}</td>
								<td className='border px-4 py-2'>{course.duration}</td>
								<td className='border px-4 py-2'>
									{course.batches && course.batches.length > 0 ? (
										<ul>
											{course.batches?.map((batch: Batch) => (
												<li key={batch.id}>
													<span className='font-semibold'>{batch.name}</span> <span className='text-xs'>({batch.status})</span><br/>
													<span className='text-xs'>Start: {batch.start_date ? batch.start_date.split("T")[0] : 'N/A'} | End: {batch.end_date ? batch.end_date.split("T")[0] : 'N/A'}</span>
												</li>
											))}
										</ul>
									) : (
										<span className='text-gray-400'>No batches</span>
									)}
								</td>
								{user?.role==='Admin' && (
									<td className='border px-4 py-2'>
										<div className="flex justify-center gap-2">
											<button
												className="bg-blue-500 hover:bg-blue-800 text-white px-2 py-2 material-icons rounded-full"
												onClick={() => handleEdit(course)}
												title="Edit Course"
											>
												&#xe3c9;
											</button>
										<button
											className="bg-red-700 hover:bg-red-800 text-white px-2 py-2 material-icons rounded-full"
											onClick={() => handleDelete(course.id as number)}
											title="Delete Course"
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
		</div>
		<Modal isOpenState={openCoursePopup} onClose={() => setOpenCoursePopup(false)}>
			<AddCourse setOpenCoursePopup={setOpenCoursePopup} />
		</Modal>
		<Modal isOpenState={openEditCoursePopup} onClose={() => setOpenEditCoursePopup(false)}>
			<EditCourse 
				setEditCoursePopup={setOpenEditCoursePopup} 
				courseToEdit={selectedCourse}
				onUpdate={fetchCourses}
			/>
		</Modal>
		</>
	);
};

export default CourseDetails;
