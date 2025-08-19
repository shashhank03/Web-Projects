import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useAuth } from './components/Context/AuthContext';

function Layout({children}) {
    const { isAuthenticated } = useAuth();
    
    return (
        <div className='flex flex-col min-h-screen mt-4'>
        <Header/>
        <div className="flex flex-1 min-h-screen bg-gray-50">
        {isAuthenticated && (<div className="w-1/6"><Sidebar /></div>)}
        <main className={`p-6 overflow-y-auto transition-all duration-300 ${isAuthenticated ? "w-5/6" : "w-full"}`}>
            <Outlet />
            {children}
        </main>
        </div>
        </div>  
    );
}

export default Layout;
