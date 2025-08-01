import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'
import { useNavigate } from 'react-router-dom';


function AddTodo() {
    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [uiTech, setUiTech] = useState('')
    const [backendTech, setBackendTech] = useState('')  
    const [libraryUsed, setLibraryUsed] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleCheckboxChange = (e) => {
    const value = e.target.value;
        if (e.target.checked) {
            setLibraryUsed((prev) => [...prev, value]);
        } else {
            setLibraryUsed((prev) => prev.filter((item) => item !== value));
        }
    };


    const addTodoHandler = (e) => {
        e.preventDefault()
        if (!title.trim()){
            return 
        } 
        dispatch(addTodo({ id, date, title, description, uiTech, backendTech, libraryUsed }))
        setId('')
        setDate('')
        setTitle('')
        setDescription('')
        setUiTech('')
        setBackendTech('')  
        setLibraryUsed([])


        alert("Task added successfully!")
        navigate("/")
    }

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Todo</h2>
            <form onSubmit={addTodoHandler} className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">ID</label>
                    <input
                        type="text"
                        className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                        placeholder="Enter ID..."
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">Date</label>
                        <input
                            type="date"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                </div>

                <div className="flex items-center space-x-4 mb-4">
                    <label className="font-medium w-24">Title</label>
                        <input
                            type="text"
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                            placeholder="Enter a Todo Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                </div>

                <div className="flex items-start space-x-4 mb-4">
                    <label className="font-medium w-24 pt-2">Description</label>
                        <textarea
                            className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                            placeholder="Enter a Description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                </div>
                <div className="flex items-start space-x-4 mb-4">
                    <label className="font-medium w-24 pt-2">UI Technology</label>
                    <select
                        className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-2 px-3 transition-colors duration-200"
                        value={uiTech}
                        onChange={(e) => setUiTech(e.target.value)}
                    >
                        <option value="">Select UI Technology</option>
                        <option value="React">React</option>
                        <option value="Angular">Angular</option>
                        <option value="Bootstrap">Bootstrap</option>
                    </select>
                </div>
                <div className="flex items-start space-x-4 mb-4">
                    <label className="font-medium w-24 pt-2">Backend Technology</label>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="radio"
                            name="backendTech"
                            value="Python"
                            checked={backendTech === 'Python'}
                            onChange={(e) => setBackendTech(e.target.value)}
                        />
                        <label>Python</label>

                        <input
                            type="radio"
                            name="backendTech"
                            value=".NET"
                            checked={backendTech === '.NET'}
                            onChange={(e) => setBackendTech(e.target.value)}
                        />
                        <label>.NET</label>

                        <input
                            type="radio"
                            name="backendTech"
                            value="PHP"
                            checked={backendTech === 'PHP'}
                            onChange={(e) => setBackendTech(e.target.value)}
                        />
                        <label>PHP</label>
                    </div>
                </div>
                <div className="flex items-start space-x-4 mb-4">
                    <label className="font-medium w-24 pt-2">Library Used</label>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="checkbox"
                            value="Redux"
                            checked={libraryUsed.includes('Redux')}
                            onChange={(e) => handleCheckboxChange(e)}
                            />
                        <label>Redux</label>
                        <input
                            type="checkbox"
                            value="Saga"
                            checked={libraryUsed.includes('Saga')}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                        <label>Saga</label>
                        <input
                            type="checkbox"
                            value="NumPy"
                            checked={libraryUsed.includes('NumPy')}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                        <label>NumPy</label>
                        <input
                            type="checkbox"
                            value="Pandas"
                            checked={libraryUsed.includes('Pandas')}
                            onChange={(e) => handleCheckboxChange(e)}
                        />
                        <label>Pandas</label>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mb-6">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Add Todo
                    </button>
                    
                    <button
                        type="reset"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                            setId('')
                            setDate('')
                            setTitle('')
                            setDescription('')
                            setUiTech('')
                            setBackendTech('')  
                            setLibraryUsed([])
                        }}
                    >
                        Reset
                    </button>
                    <button
                        type="cancel"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        onClick={()=> navigate('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddTodo