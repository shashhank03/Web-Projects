import React, { useEffect, useState } from 'react';

const Modal = ({ children, isOpenState, onClose }) => {
    const [isOpen, setIsOpen] = useState(isOpenState);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    console.log('isopen', isOpen)

    return (
        <>
            <button className='bg-orange-700 hover:bg-orange-800 text-white px-4 py-2 rounded' onClick={handleOpen}> Modal</button>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8">
                        {children}
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
