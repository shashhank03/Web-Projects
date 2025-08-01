import React from 'react'
import { Link } from 'react-router-dom';
import Todos from '../Todos';
export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">


            <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium">To-Do App</h1>
            <Todos/>
        </div>
    );
}