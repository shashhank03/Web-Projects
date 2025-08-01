import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editTodo } from '../features/todo/todoSlice'
import { useNavigate, useParams } from 'react-router-dom'

function EditTodo() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const todo = useSelector((state) =>
        state.todos.find((t) => String(t.id) === id)
    )

    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [uiTech, setUiTech] = useState('')
    const [backendTech, setBackendTech] = useState('')  
    const [libraryUsed, setLibraryUsed] = useState([])

    useEffect(() => {
        if (todo) {
            setDate(todo.date)
            setTitle(todo.title)
            setDescription(todo.description)
            setUiTech(todo.uiTech)
            setBackendTech(todo.backendTech)
            setLibraryUsed(todo.libraryUsed)
        }
    }, [todo])

    const handleEdit = (e) => {
        e.preventDefault()
        if (!title.trim()) return
        dispatch(editTodo({ id, date, title, description, uiTech, backendTech, libraryUsed }))
        alert('Task updated successfully! ✅')
        navigate('/')
    }

    if (!todo) {
        return (
            <div className="text-center text-red-500 mt-10">
                Task not found. Probably escaped the Redux matrix. 🕶️
            </div>
        )
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Todo</h2>
            <form onSubmit={handleEdit} className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">ID</label>
                    <input
                        type="text"
                        className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                        value={id}
                        disabled
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">Date</label>
                    <input
                        type="date"
                        className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">Title</label>
                    <input
                        type="text"
                        className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex items-start space-x-4 mb-4">
                    <label className="font-medium w-24 pt-2">Description</label>
                    <textarea
                        className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">UI Technology</label>
                    <select
                        className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                        value={uiTech}
                        onChange={(e) => setUiTech(e.target.value)}
                    >
                        <option value="">Select UI Technology</option>
                        <option value="React">React</option>
                        <option value="Angular">Angular</option>
                        <option value="Bootstrap">Bootstrap</option>
                    </select>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">Backend Technology</label>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="radio"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                            value={backendTech}
                            onChange={(e) => setBackendTech(e.target.value)}
                        />
                        <label>Python</label>
                        <input
                            type="radio"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                            value={backendTech}
                            onChange={(e) => setBackendTech(e.target.value)}
                        />
                        <label>.NET</label>
                        <input
                            type="radio"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                            value={backendTech}
                            onChange={(e) => setBackendTech(e.target.value)}
                        />
                        <label>PHP</label>
                    </div>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">Library Used</label>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="checkbox"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                            value={libraryUsed}
                            onChange={(e) => setLibraryUsed(e.target.value)}
                        />
                        <label>React</label>
                        <input
                            type="checkbox"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                            value={libraryUsed}
                            onChange={(e) => setLibraryUsed(e.target.value)}
                        />
                        <label>.NET</label>
                        <input
                            type="checkbox"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                            value={libraryUsed}
                            onChange={(e) => setLibraryUsed(e.target.value)}
                        />
                        <label>NumPy</label>
                        <input
                            type="checkbox"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 py-2 px-3"
                            value={libraryUsed}
                            onChange={(e) => setLibraryUsed(e.target.value)}
                        />
                        <label>Pandas</label>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-300 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded"
                        onClick={() => window.location.reload()}
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-300 text-white px-4 py-2 rounded"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTodo
