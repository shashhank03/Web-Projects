import React, { useState, useEffect } from 'react'
import axios from '../../utils/axiosConfig';

function AddAddress({ setOpenAddressPopup, addressToEdit }) {
    const [street, setStreet] = useState('');
    const [city, setCity] = useState(''); 
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (addressToEdit) {
            setStreet(addressToEdit.street || '');
            setCity(addressToEdit.city || '');
            setState(addressToEdit.state || '');
            setPinCode(addressToEdit.pin_code || '');
            setCountry(addressToEdit.country || '');
        }
    }, [addressToEdit]);

    const handleAddAddress = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        
        try{
            const res = await axios.put('/api/users/update-address', {
                street,
                city,
                state,
                pin_code: pinCode,
                country
            });
            setMessage('Address added successfully');
            setError('');
            if (setOpenAddressPopup) {
                setOpenAddressPopup(false);
            }
        } catch(err){
            setError(err.response?.data?.message || 'Adding address failed');
            setMessage('');
        }
    }

    return (
        <div className="flex flex-col">
            <h2 className='text-2xl font-medium mb-6 text-center'>Add Address</h2>
            <div className='flex justify-center gap-4 mb-6'>
                <form onSubmit={handleAddAddress} className="space-y-4">
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='street'>Street:</label>
                            <input
                                type="text"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='city'>City:</label>
                            <input
                                type="text"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='state'>State:</label>
                            <input
                                type="text"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='pinCode'>Pin Code:</label>
                            <input
                                type="number"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex items-center space-x-4 mb-4'>
                        <label className="block text-sm font-semibold w-32" htmlFor='country'>Country:</label>
                            <input
                                type="text"
                                className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-5 transition-colors duration-200"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button
                            type="submit"
                            className="bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded"
                        >
                            Add Address
                        </button>
                        <button
                            type="cancel"
                            className="bg-white outline outline-orange-700 hover:bg-gray-300 text-orange-700 px-4 py-2 rounded"
                            onClick={() => setOpenAddressPopup(false)}
                        >   
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAddress
