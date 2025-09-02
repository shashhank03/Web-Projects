import React from 'react'
import StudentCard from '../components/Cards/StudentCard';
import StaffCard from '../components/Cards/StaffCard';
import AdminCard from '../components/Cards/AdminCard';
import { useAuth } from '../components/Context/AuthContext';
import AttendanceChart from '../components/Charts/AttendanceChart';
import AdminStudentCard from '../components/Cards/AdminStudent';
import AdminStaffCard from '../components/Cards/AdminStaffCard';
import BatchCard from '../components/Cards/BatchCard';


const Dashboard: React.FC = () => {

    const { user } = useAuth();
    if (!user) return  <div>No user found...</div>;
    return (
        <>
        <h1 className='text-center text-2xl sm:text-5xl py-10 font-sans md:font-serif'>{user.role} Dashboard</h1>
        <div className='flex justify-center gap-8 w-full pl-10 pr-10'>
            <div className='flex flex-col gap-6 w-3/5'>
                {user.role === 'Student' && (<div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <StudentCard />
                </div>)}

                {user.role === 'Staff' && (<div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <StaffCard />
                </div>)}

                {user.role === 'Admin' && (
                <>
                    <div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <AdminCard />
                    </div>
                    <div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-6'>
                    <BatchCard />
                    </div>
                </>
                )}
            </div>

            <div className='max-w-2xl w-2/5'>
                <div className='flex flex-col gap-6'>
                {user.role !== 'Admin' && (<div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <AttendanceChart />
                </div>)}

                {user.role === 'Admin' && (
                <>
                    <div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <AdminStudentCard />
                    </div>
                    <div className='max-w-2xl bg-white hover:bg-gray-50 hover:shadow-2xl rounded-2xl h-fit shadow-lg p-8'>
                    <AdminStaffCard />
                    </div>
                </>
                )}
            </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard
