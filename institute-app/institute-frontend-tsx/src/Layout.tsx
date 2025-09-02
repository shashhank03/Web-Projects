import React from 'react';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { useAuth } from './components/Context/AuthContext';

const Layout: React.FC = ({children}: React.PropsWithChildren<{}>) => {
    const { isAuthenticated } = useAuth();
    
    return (
        <div className='flex flex-col fixed inset-0'>
        <Header/>
        <div className="flex flex-1 min-h-screen bg-gray-50">
        {isAuthenticated && (<div className="w-1/7"><Sidebar /></div>)}
        <main className={`p-6 overflow-auto scrollbar-hide transition-all duration-300 mb-20 ${isAuthenticated ? "w-6/7" : "w-full"}`}>
            <Outlet />
            {children}
        </main>
        </div>
        </div>  
    );
}

export default Layout;
