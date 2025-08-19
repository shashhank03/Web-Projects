import React from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-gray-700 border-gray-200 px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://www.vhv.rs/dpng/d/426-4262188_icon-students-red-education-icon-png-transparent-png.png"
                            className="mr-3 h-12 rounded-full "
                            alt="Logo"
                        />
                        <h2 className='text-2xl font-bold text-center text-white'>Institute Management</h2>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-1 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Logout
                                </button>
                                <Link to="/profile" className="flex items-center">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                                        className="mr-3 h-12 rounded-full"
                                        alt="Profile"
                                    />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-1 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-orange-700 bg-white border border-orange-700 hover:bg-gray-400 focus:ring-1 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
