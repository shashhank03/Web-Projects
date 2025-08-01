import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos'

function Layout() {
    return (  
        <>
        <Header/>
        <Outlet/>
        </>
    );
}

export default Layout;
