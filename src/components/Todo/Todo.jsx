import "./Todo.css";
import { useState } from 'react';
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate"
export const Todo = () => {

    const [inputValue, setInputValue] = useState("");

    const [task, setTask] = useState([]);

    const handleInputChange = (value) => {
        setInputValue(value); //the moment we press any key it will change the value
    };

    const handleFormSubmit = (event) => {
        
        event.preventDefault(); //this will prevent the form from submitting & causing a page reload
        if(!inputValue) return; //if no input do not change the value
        if(task.includes(inputValue)) return; //no duplicate values
        setTask((prevTask) => [...prevTask, inputValue]); //append in the array 
        
    };

    const handleDeleteTodo = (value) => {
        const updatedTask = task.filter(
            (curTask) => curTask !== value
        ); //display elements that don't match the value 
        setTask(updatedTask); //update the task array
    };

    const handleClearTodoData = () => {
        setTask([]); //clear the task array
    };

    return <section className="todo-container">
        <header>
            <h1>Todo List</h1>
            <TodoDate />
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
        <section className="myUnOrdList">
            <ul>
                {
                    task.map((curTask, index) => {
                        return <TodoList 
                                    key={index} 
                                    data={curTask} 
                                    onhandleDeleteTodo={handleDeleteTodo} 
                                />
                    })
                }
            </ul>
        </section>
        <section>
            <button className="clear-btn" onClick={handleClearTodoData}>
                Clear All
            </button>
        </section>
    </section>
}
