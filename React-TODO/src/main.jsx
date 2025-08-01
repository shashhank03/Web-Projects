import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import AddTodo from './components/AddTodo.jsx'
import TaskDetails from './components/TaskDetails.jsx'
import EditTask from './components/EditTask.jsx'
import { Provider } from "react-redux";
import { store } from "./app/store.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<Layout/>}>
      <Route path ='' element = {<Home/>}/>
      <Route path ='about' element = {<About/>}/>
      <Route path ='contact' element = {<Contact/>}/>
      <Route path ='addTask' element = {<AddTodo/>}/>
      <Route path="details/:id" element={<TaskDetails />} />
      <Route path ='edit/:id' element = {<EditTask/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
