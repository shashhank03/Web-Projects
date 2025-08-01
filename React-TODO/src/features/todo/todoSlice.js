import { createSlice } from "@reduxjs/toolkit";

const storedTodos = JSON.parse(localStorage.getItem("todos")) || [{
    id: 101,
    date: new Date(Date.now()).toISOString().split("T")[0],
    title: "first task",
    description: "this is the first task",
    uiTech: "React",
    backendTech: "Python",
    libraryUsed: ["Redux", "Saga"]
}];

const initialState = {
    todos: storedTodos,
};


export const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        addTodo: (state,action) => {
            const todo = {
                id: action.payload.id,
                date: action.payload.date,
                title: action.payload.title,
                description: action.payload.description,
                uiTech: action.payload.uiTech,
                backendTech: action.payload.backendTech,
                libraryUsed: action.payload.libraryUsed,
            }
            state.todos.push(todo)
            localStorage.setItem('todos', JSON.stringify(state.todos))

        },
        removeTodo: (state,action) => {
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        editTodo: (state, action) => {
            const { id, date, title, description, uiTech, backendTech, libraryUsed } = action.payload;
            const index = state.todos.findIndex((todo) => todo.id === id);

            if (index !== -1) {
                state.todos[index] = { id, date, title, description, uiTech, backendTech, libraryUsed };
                localStorage.setItem('todos', JSON.stringify(state.todos))
            }
        }
    }
})

export const {addTodo,removeTodo,editTodo} = todoSlice.actions

export default todoSlice.reducer