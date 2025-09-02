import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosConfig';
import { type Course, type Batch } from '../Context/AuthContext'

interface AddBatchProps {
    setOpenBatchPopup: (open: boolean) => void;
    onBatchAdded: () => void;
    selectedBatch?: Batch;
}

const AddBatch: React.FC<AddBatchProps> = ({ setOpenBatchPopup, onBatchAdded, selectedBatch }) => {
    const [courses, setCourses] = useState<Array<Course>>([]);
    const [courseId, setCourseId] = useState<number | null>(null);
    const [batchName, setBatchName] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [status, setStatus] = useState<string>('active');

    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        axios.get<Array<Course>>('/api/courses')
            .then(res => setCourses(res.data))
            .catch(() => setError('Failed to fetch courses'));
    }, []);

    useEffect(() => {
        if (selectedBatch) {
            setCourseId(selectedBatch.course_id || null);
            setBatchName(selectedBatch.name || '');
            setStartDate(selectedBatch.start_date?.split('T')[0] || '');
            setEndDate(selectedBatch.end_date?.split('T')[0] || '');
            setStatus(selectedBatch.status || 'active');
        }
    }, [selectedBatch]);

    const handleAddBatch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
        if (selectedBatch) {
            await axios.put(`/api/batch/${selectedBatch.id}`, {
                course_id: courseId,
                name: batchName,
                start_date: startDate,
                end_date: endDate,
                status
            });
            setMessage('Batch updated successfully');
        } else {
            await axios.post('/api/batch', {
                course_id: courseId,
                name: batchName,
                start_date: startDate,
                end_date: endDate,
                status
            });
            setMessage('Batch added successfully');
        }
        setMessage('Batch added successfully');
        if (onBatchAdded) onBatchAdded();
        window.location.reload();
        if (setOpenBatchPopup) {
            setOpenBatchPopup(false);
        }
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to add batch');
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col">
            <h2 className='text-2xl font-medium mb-6 text-center'>Add Batch</h2>
            <div className='flex justify-center gap-4 mb-6'>
                <form onSubmit={handleAddBatch} className="space-y-4">
                    
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32">Course:</label>
                        <select
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-5 outline-none"
                            value={courseId || ''}
                            onChange={(e) => setCourseId(Number(e.target.value))}
                            required
                        >
                            <option value="">Select Course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.course_name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32">Batch Name:</label>
                        <input
                            type="text"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-5 outline-none"
                            value={batchName}
                            onChange={(e) => setBatchName(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32">Start Date:</label>
                        <input
                            type="date"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-5 outline-none"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32">End Date:</label>
                        <input
                            type="date"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-5 outline-none"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32">Status:</label>
                        <select
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 py-2 px-5 outline-none"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {error && <div className="text-red-500 text-center">{error}</div>}
                    {message && <div className="text-green-500 text-center">{message}</div>}

                    <div className='flex justify-center gap-4'>
                        <button
                            type="submit"
                            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
                        >
                            Add Batch
                        </button>
                        <button
                            type="button"
                            className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
                            onClick={() => setOpenBatchPopup(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddBatch;
