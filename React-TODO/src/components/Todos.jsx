import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { removeTodo,editTodo } from "../features/todo/todoSlice";
import { useNavigate } from 'react-router-dom';


function Todos() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div className="max-w-3xl mx-auto mt-8">
            <div className="text-2xl font-bold mb-4 text-center">Task Details</div>
            <table className="min-w-full bg-white rounded shadow">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Date</th>
                        <th className="py-2 px-4 border-b">Title</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{todo.id}</td>
                            <td className="py-2 px-4 border-b">{todo.date}</td>
                            <td className="py-2 px-4 border-b">{todo.title}</td>
                            <td className="py-2 px-4 border-b">{todo.description}</td>
                            <td className="py-2 justify-center px-4 border-b flex space-x-2">
                                <button
                                    onClick={() => 
                                        dispatch(removeTodo(todo.id),
                                        alert(`Task ${todo.id} deleted`))}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-300 mb-1"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => navigate(`/details/${todo.id}`)}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-300 mb-1"
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => navigate(`/edit/${todo.id}`)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-300 mb-1"
                                    >
                                    Edit
                                </button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Todos
