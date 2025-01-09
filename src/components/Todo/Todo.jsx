import "./Todo.css";
import { useEffect, useState } from 'react';
import { MdCheck, MdDeleteForever } from "react-icons/md";
export const Todo = () => {
    const [inputValue, setInputValue] = useState("");

    const [task, setTask] = useState([]);

    const [dateTime, setDateTime] = useState("");

    const handleInputChange = (value) => {
        setInputValue(value); //the moment we press any key it will change the value
    };

    const handleFormSubmit = (event) => {

        event.preventDefault(); //this will prevent the form from submitting & causing a page reload

        if(!inputValue){
            setInputValue("");
            return; //if no input do not change the value
        } 
        if(task.includes(inputValue)) return; //no duplicate values

        setTask((prevTask) => [...prevTask, inputValue]); //append in the array 

        setInputValue(""); //after adding clear the input field
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

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const today = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            setDateTime(`${today} - ${time}`); //update the date time every second
        }, 1000);

        return () => clearInterval(interval); //clean up the interval when component unmounts
    }, []);

    return <section className="todo-container">
        <header>
            <h1>Todo List</h1>
            <h2 className="date-time">{dateTime}</h2>
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
                        return <li key={index} className="todo-item">
                            <span>{curTask}</span>
                            <button className="check-btn">
                                <MdCheck />
                            </button>
                            <button 
                                className="delete-btn" 
                                onClick={() => handleDeleteTodo(curTask)}
                            >
                                <MdDeleteForever />
                            </button>
                        </li>
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
