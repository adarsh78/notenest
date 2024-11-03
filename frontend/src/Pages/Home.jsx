import React, { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContextProvider.jsx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ThemeContext } from "../Context/ThemeContextProvider.jsx";
import { handleError, handleSuccess } from "../toastMessage.js";
import { ToastContainer } from "react-toastify";

const Home = () => {

  const { todos, createTodo, deleteTodo } = useContext(TodoContext);

  console.log("Todos are: ", todos);

  const [isInputOpen, setIsInputOpen] = useState(false);

  const handleInputBoxOpen = () => {
    setIsInputOpen(true);
  };

  const handleInputBoxClose = () => {
    setIsInputOpen(false);
  };

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const copyNewTodo = {...newTodo};
    copyNewTodo[name] = value;
    setNewTodo(copyNewTodo);
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    if(newTodo.title || newTodo.description){
      createTodo(newTodo);
      setNewTodo({
          title: "",
          description: ""
      });
      handleSuccess("New note added");
      setIsInputOpen(false);
    }
    else{
      handleError("Please enter a note");
    } 
  }

  const { darkTheme } = useContext(ThemeContext);

  return (
    <>

      <div>
        {!isInputOpen && (
          <div
            onClick={handleInputBoxOpen}
            className={`${darkTheme ? "border-zinc-200 border-[0.5px] shadow-xl" : "border-zinc-700 shadow-[0_1px_20px_-7px_rgba(20,40,40,0.8)]"} w-[30rem] mx-auto border-zinc-700 rounded-md mt-3 p-2 cursor-pointer`}
          >
            <span className={`${darkTheme ? "text-zinc-200" : "text-zinc-700"}`}>Take a note...</span>
          </div>
        )}

        {isInputOpen && (
          <div className={`${darkTheme ? "border-zinc-200 border-[0.5px] shadow-xl" : "border-zinc-700 shadow-[0_1px_20px_-7px_rgba(20,40,40,0.8)]"} w-[30rem] mx-auto rounded-md mt-3 p-2 cursor-pointer flex flex-col gap-2`}>
            <input
              className="p-1 text-xl focus:outline-none bg-transparent"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              aria-label="title"
              value={newTodo.title}
              onChange={handleInputChange}
            />

            <input
              className="px-1 focus:outline-none bg-transparent"
              type="text"
              name="description"
              id="description"
              placeholder="Take a note..."
              aria-label="description"
              value={newTodo.description}
              onChange={handleInputChange}
            />

            <button onClick={handleAddTodo} className={`${darkTheme ? "text-zinc-200" : "text-zinc-700"} flex justify-end mr-3`}>Add</button>
            <button onClick={handleInputBoxClose} className={`${darkTheme ? "text-zinc-200" : "text-zinc-700"} flex justify-end mr-3`}>
              Close
            </button>
          </div>
        )}
      </div>

      <div className="w-[1300px] mx-auto mt-4 flex gap-3 justify-center flex-wrap py-2">
        {todos.length > 0 &&
          todos.map((todo) => (
            <div
              className="bg-gray-500 w-[20%] px-4 py-2 rounded-md"
              key={todo._id}
            >
              <div className="">
                <h3 className="text-xl mb-2">{todo.title}</h3>
                <p>{todo.description}</p>
                <div className="flex gap-2 justify-end items-end">
                <MdEdit size={22}/>
                <MdDelete 
                size={22}
                onClick={() => deleteTodo(todo._id)}
                />
                </div>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
