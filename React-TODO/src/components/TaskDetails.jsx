import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../features/todo/todoSlice';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todo = useSelector((state) =>
    state.todos.find((t) => String(t.id) === id)
  );

  if (!todo) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Task not found 
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
    alert(`Task ${todo.id} deleted`);
    navigate('/');
  };

  const handleEdit = () => {
    navigate(`/edit/${todo.id}`);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
      <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Task Detail</h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={goHome}
          >
            Retrieve
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <tbody>
            <tr className="border-b">
              <td className="py-2 font-medium w-32">ID</td>
              <td className="py-2">{todo.id}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Date</td>
              <td className="py-2">{todo.date}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Title</td>
              <td className="py-2">{todo.title}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Description</td>
              <td className="py-2">{todo.description}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">UI Technology</td>
              <td className="py-2">{todo.uiTech}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Back End Technology</td>
              <td className="py-2">{todo.backendTech}</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 font-medium">Library Used</td>
              <td className="py-2">{Array.isArray(todo.libraryUsed) ? todo.libraryUsed.join(', ') : todo.libraryUsed || '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
  );
};

export default TaskDetails;
