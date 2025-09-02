import { useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import Modal from '../modal/modal';
import AddBatch from '../AddCourses/AddBatch';
import { type Batch } from '../Context/AuthContext';


function BatchCard() {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [error, setError] = useState<string>('');
    const [openBatchPopup, setOpenBatchPopup] = useState<boolean>(false);
    const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

    const refreshBatchList = () => {
        axios.get<Batch[]>('/api/batch')
            .then(res => setBatches(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        refreshBatchList();
        setError('');
    }, []);

    const handleEdit = (batch: Batch) => {
        setSelectedBatch(batch);
        setOpenBatchPopup(true);
        setError('');
    };

    const handleDelete = async (batchId: number) => {
        if (window.confirm('Are you sure you want to delete this batch?')) {
            try {
                await axios.delete(`/api/batch/${batchId}`);
                setBatches(batches.filter(batch => batch.id !== batchId));
                setError('');
                alert('Batch deleted successfully');
            } catch (err: any) {
                console.error('Delete error:', err);
                setError(err.response?.data?.message || 'Failed to delete batch');
                alert('Failed to delete batch');
            }
        }
    };

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
        <div className="overflow-x-auto mt-8">
            <h2 className="text-2xl font-medium mb-4">Batch Details</h2>
            <table className="min-w-full border border-gray-300 mb-3">
                <thead className="bg-gray-300">
                    <tr>
                        <th className="border px-4 py-2">Batch Name</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Start Date</th>
                        <th className="border px-4 py-2">End Date</th>
                        <th className="border px-4 py-2">No. of Students</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {batches.map(batch => (
                        <tr key={batch.id} className="hover:bg-gray-100">
                            <td className="border px-4 py-2">{batch.name}</td>
                            <td className="border px-4 py-2">{batch.status}</td>
                            <td className="border px-4 py-2">{batch.start_date?.split("T")[0]}</td>
                            <td className="border px-4 py-2">{batch.end_date?.split("T")[0]}</td>
                            <td className="border px-4 py-2">{batch.student_count || 0}</td>
                            <td className="border px-4 py-2">
                                <div className="flex justify-center gap-2">
                                        <button
                                                className="bg-blue-500 hover:bg-blue-800 text-white px-2 py-2 material-icons rounded-full"
                                                onClick={() => handleEdit(batch)}
                                                title="Edit Batch"
                                            >
                                                &#xe3c9;
                                            </button>
                                        <button
                                            className="bg-red-700 hover:bg-red-800 text-white px-2 py-2 material-icons rounded-full"
                                            onClick={() => batch.id !== undefined && handleDelete(batch.id)}
                                            title="Delete Batch"
                                        >
                                            &#xe872;
                                        </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
            </div>
            <div className="flex justify-center gap-4">
                    <button
                        className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-full"
                        onClick={() => setOpenBatchPopup(true)}
                    >
                        Add Batch
                    </button>
                </div>
            <Modal isOpenState={openBatchPopup} onClose={() => setOpenBatchPopup(false)}>
                <AddBatch setOpenBatchPopup={setOpenBatchPopup} onBatchAdded={refreshBatchList} selectedBatch={selectedBatch ?? undefined} />
            </Modal>
        
        </div>
    );
}

export default BatchCard;
