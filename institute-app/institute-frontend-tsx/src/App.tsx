import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './Layout';
import Home from './components/Home/Home';
import ProtectedRoute from './components/Context/ProtectedRoute';
import StudentDetails from './components/Tables/StudentDetails';
import StaffDetails from './components/Tables/StaffDetails';
import Profile from './pages/Profile';
import CourseDetails from './components/Tables/CourseDetails';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './components/Context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/> 
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='students' element={
              <ProtectedRoute>
                <StudentDetails/>
              </ProtectedRoute>
            }/>
            <Route path='staff' element={
              <ProtectedRoute>
                <StaffDetails/>
              </ProtectedRoute>
            }/>
            <Route path='courses' element={
              <ProtectedRoute>
                <CourseDetails/>
              </ProtectedRoute>
            }/>
            <Route path='profile' element={
              <ProtectedRoute>
                <Profile/>
              </ProtectedRoute>
            }/>
            <Route path='dashboard' element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }/>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


