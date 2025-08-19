import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function Layout({children}) {
    return (
        <div className='flex flex-col min-h-screen'>
        <Header/>
            <div className="flex flex-1 bg-gray-50 z-0">
                <Sidebar />
                <main className="flex-1 ml-64 p-6 overflow-y-auto">
                    <Outlet/>
                    {children}
                </main>
            </div>
        </div>  
    );
}

export default Layout;
