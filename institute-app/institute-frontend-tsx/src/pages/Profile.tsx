import { useState, useEffect } from 'react'
import axios from '../utils/axiosConfig';
import AddAddress from '../components/AddUser/AddAddress';
import EditUser from '../components/AddUser/EditUser';
import Modal from '../components/modal/modal';
import { type User } from '../components/Context/AuthContext';


function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [openAddressPopup, setOpenAddressPopup] = useState<boolean>(false);
    const [openEditUserPopup, setOpenEditUserPopup] = useState<boolean>(false);

    useEffect(() => {
        axios.get<User>('/api/users/profile')
        .then(res => setUser(res.data))
        .catch(err => console.error(err));
    }, []);
    return (
        <>
        <h1 className='text-center text-2xl sm:text-5xl py-10 font-medium'>Profile</h1>
        <div className='flex justify-center gap-8 w-full '>
            <div className='max-w-2xl w-full bg-white rounded-2xl hover:bg-gray-50 hover:shadow-2xl shadow-lg p-8'>
                <h1 className='text-center text-2xl sm:text-5xl py-10 font-sans md:font-serif'>{user?.full_name}</h1>
                
                <div className='flex justify-center mb-6'>
                    <img 
                        src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" 
                        alt="Profile" 
                        className='w-24 h-24 rounded-full'
                    />
                </div>

                <div className='space-y-4'>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Name:</span>
                        <span>{user?.full_name}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Email:</span>
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Phone:</span>
                        <span>{user?.phone_number}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Gender:</span>
                        <span>{user?.gender}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Date of Birth:</span>
                        <span>{user?.date_of_birth?.split('T')[0]}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Role:</span>
                        <span>{user?.role}</span>
                    </div>
                    <div className='flex justify-between border-b pb-2'>
                        <span className='font-semibold'>Address:</span>
                        <span>{user?.address
                        ? `${user.address.street}, ${user.address.city}, ${user.address.state}`
                        : 'Not added'}</span>
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button
                            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-full"
                            onClick={() => setOpenEditUserPopup(true)}    
                        >
                            Edit User Details
                        </button>
                        <button
                            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded-full"
                            onClick={() => setOpenAddressPopup(true)}
                        >
                            Edit Address
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Modal isOpenState={openAddressPopup} onClose={() => setOpenAddressPopup(false)}>
            <AddAddress setOpenAddressPopup={setOpenAddressPopup} addressToEdit={user?.address}/>    
        </Modal>
        <Modal isOpenState={openEditUserPopup} onClose={() => setOpenEditUserPopup(false)}>    
            <EditUser 
                    setEditUserPopup={setOpenEditUserPopup}
                    userToEdit={user}
                    isProfileEdit={true} onUpdate={function (): void {
                        throw new Error('Function not implemented.');
                    } }/>    
        </Modal>
        
        </>
    )
}

export default Profile
