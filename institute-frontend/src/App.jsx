import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './Layout';
import Home from './components/Home/Home';
// import ProtectedRoute from './components/Context/ProtectedRoutes';
import { Navigate } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import StudentDetails from './components/Tables/StudentDetails';
import StaffDetails from './components/Tables/StaffDetails';
import Profile from './pages/Profile';
import CourseDetails from './components/Tables/CourseDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element={<Layout/>}>
          <Route path ='' element = {<Home/>}/>
          <Route path ='login' element = {<Login/>}/>
          <Route path ='register' element = {<Register/>}/>
          <Route path ='students' element = {<StudentDetails/>}/>
          <Route path ='staff' element = {<StaffDetails/>}/>
          <Route path ='courses' element = {<CourseDetails/>}/>
          <Route path ='profile' element = {<Profile/>}/>
          {/* <Route path ='/admin' element = {
            <ProtectedRoute roles={['admin']}>
              <AdminPage/>
            </ProtectedRoute>
          }/> */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

