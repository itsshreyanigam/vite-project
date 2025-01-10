import { useState } from "react";

export const TodoForm = (onAddTodo) => {
    

    

    const handleFormSubmit = (event) => {
        if (typeof onAddTodo === 'function') {
            onAddTodo(inputValue);
        } else {
            console.error("onAddTodo is not a function");
        }

    }
    return (
        
    )
};
