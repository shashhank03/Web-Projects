import React, { useEffect, useState } from 'react';

const Modal = ({ children, isOpenState, onClose }) => {
    const [isOpen, setIsOpen] = useState(isOpenState);

    useEffect(() => {
        setIsOpen(isOpenState);
    }, [isOpenState]);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-fit mx-4 relative z-50">
                <button 
                    className='absolute top-4 right-4 text-red-600 hover:text-white outline outline-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-1.5 py-0.9'
                    onClick={handleClose}
                >
                    X
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;


