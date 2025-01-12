import "./Todo.css";
import { useEffect, useState } from 'react';
import { MdCheck, MdDeleteForever } from "react-icons/md";
export const Todo = () => {
     const todoKey = "reactTodo";
    const [inputValue, setInputValue] = useState({ content: "" });
    const [dateTime, setDateTime] = useState("");
    const [task, setTask] = useState(() => {
        const savedTask = localStorage.getItem(todoKey); //getting the data from local storage
        return savedTask ? JSON.parse(savedTask) : [];
    });

    const handleInputChange = (value) => {
        setInputValue({
            id: value, 
            content: value, 
            checked: false
        }); //the moment we press any key it will change the value
    };

    const handleFormSubmit = (event) => {
        const { id, content, checked } = inputValue;

        event.preventDefault(); //this will prevent the form from submitting & causing a page reload

        if(!content) return; //if no input do not change the value
        
        // if(task.includes(inputValue)){
        //     setInputValue("");
        //     return; //no duplicate values
        // } 
        const ifTodoContentMatched = task.find((curTask) => curTask.content === inputValue.content);
        if(ifTodoContentMatched) return; //no duplicate values

        setTask((prevTask) => [...prevTask, { id, content, checked}]); //append in the array 
        
        setInputValue({ content: ""}); //clear the input field after adding the task
        setInputValue({
            id: "", 
            content: "", 
            checked: false
        });
    };

    localStorage.setItem(todoKey, JSON.stringify(task)); //save the task in local storage

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const today = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            setDateTime(`${today} - ${time}`); //update the date time every second
        }, 1000);

        return () => clearInterval(interval); //clean up the interval when component unmounts
    }, []);

    const handleDeleteTodo = (value) => {
        const updatedTask = task.filter(
            (curTask) => curTask !== value
        ); //display elements that don't match the value 
        setTask(updatedTask); //update the task array
    };

    const handleClearTodoData = () => {
        setTask([]); //clear the task array
    };

    const handleCheckedTodo = (taskContent) => {
        const updatedTask = task.map((curTask) => {
            if( curTask.content === taskContent){
                return { ...curTask, checked: !curTask.checked}
            }else{
                return curTask;
            } 
        });
        setTask(updatedTask);
    }

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
                        value={inputValue.content}
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
                        <span className={curTask.checked ? "checkList" : "notCheckList"}>{curTask.content}</span>
                        <button className="check-btn" onClick={() => handleCheckedTodo(curTask.content)}>
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
