import "./Todo.css";
import React, { useState } from 'react';
export const Todo = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (value) => {
        setInputValue(value); //the moment we press any key it will change the value
    };

    const handleFormSubmit = (event) => {
        event.preventDefault(); //this will prevent the form from submitting and causing a page reload
    }
    return <section className="todo-container">
        <header>
            <h1>Todo List</h1>
        </header>
        <section className="form">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input 
                        type="text" 
                        className="todo-input" 
                        autoComplete="off" 
                        value={inputValue}
                        onChange={(event) => handleInputChange(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="todo-btn">Add Task</button>
                </div>
            </form>
        </section>
    </section>
}
