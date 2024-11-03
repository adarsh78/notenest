import React, { createContext, useEffect, useState } from "react";
import { handleSuccess } from "../toastMessage";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const createTodo = async (newTodo) => {
    try {
      const url = "https://notenest-api.vercel.app/todos";
      // const url = "http://localhost:3010/todos";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTodo),
      });

      const result = await response.json();

      if (response.ok) {
        setTodos([...todos, result.data]); // Add the new todo to the list
      } else {
        console.log(`Error: ${result.message}`);
      }
    } catch (error) {
      console.log(`Error occurred in creating a new todo: ${error.message}`);
    }
  };

  const fetchTodos = async () => {
    try {
      const url = "https://notenest-api.vercel.app/todos";
      // const url = "http://localhost:3010/todos";
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setTodos(result.data);
      } else {
        console.log(`Error: ${result.message}`);
      }
    } catch (error) {
      console.log(`Error fetching the todos: ${error.message}`);
    }
  };

  const updateTodo = async () => {};

  const deleteTodo = async (todoId) => {
    try {
      const url = `https://notenest-api.vercel.app/todos/${todoId};
        // const url = `http://localhost:3010/todos/${todoId}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
        });

        const result = await response.json();

        if(response.ok){
            console.log(result);
            const todosAfterOneDeletion = todos.filter((todo) => todo._id !== todoId )
            setTodos(todosAfterOneDeletion);
            handleSuccess("Todo Trashed");
        }
        else {
            console.log(`Error: ${result.message}`);
        }
    } catch (error) {
        console.log(`Error in deleting a todo: ${error.message}`);
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      fetchTodos();
    }
  }, [localStorage.getItem("token")]);

  return (
    <TodoContext.Provider value={{ todos, createTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
