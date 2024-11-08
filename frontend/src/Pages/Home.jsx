import React, { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContextProvider.jsx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { ThemeContext } from "../Context/ThemeContextProvider.jsx";
import { handleError, handleSuccess } from "../toastMessage.js";
import { ToastContainer } from "react-toastify";

const Home = () => {

  const { todos, filteredTodo, createTodo, deleteTodo, updateTodo } = useContext(TodoContext);

  // console.log("Todos are: ", todos);

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

      <div className="mt-7">
        {!isInputOpen && (
          <div
            onClick={handleInputBoxOpen}
            className={`${darkTheme ? "border-zinc-400 border-[0.5px]" : "shadow-[0_1px_20px_-7px_rgba(20,40,40,0.8)]"} w-[18rem] md:w-[25rem] lg:w-[30rem] mx-auto rounded-md mt-3 p-2 cursor-pointer`}
          >
            <span className={`${darkTheme ? "text-zinc-200" : "text-zinc-700"}`}>Take a note...</span>
          </div>
        )}

        {isInputOpen && (
          <div className={`${darkTheme ? "border-zinc-200 border-[0.5px] shadow-xl text-zinc-300" : "border-zinc-700 shadow-[0_1px_20px_-7px_rgba(20,40,40,0.8)] text-zinc-900"} w-[18rem] md:w-[25rem] lg:w-[30rem] mx-auto rounded-md mt-3 p-2 cursor-pointer flex flex-col gap-2`}>
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
      <div className="w-[20rem] md:w-[800px] lg:w-[1200px] mx-auto mt-4 flex gap-3 justify-center flex-wrap py-2">
        {filteredTodo.length > 0 &&
          filteredTodo.map((todo) => (
            <div
              className={`${darkTheme ? "border-[0.5px] border-zinc-200" : "border-[0.5px] border-zinc-700"} w-[100%] md:w-[50%] lg:w-[20%] px-4 bg-transparent py-2 rounded-md`}
              key={todo._id}
            >
              <div className={`${darkTheme ? "text-zinc-300" : "text-zinc-800"}`}>
                <h3 className="text-xl mb-2">{todo.title}</h3>
                <p>{todo.description}</p>
                <p>{}</p>
                <div className="flex gap-2 justify-end items-end">
                <MdEdit 
                className="cursor-pointer"
                size={22}
                onClick={() => updateTodo(todo._id, updatedNote)}
                />

                <MdDelete 
                className="cursor-pointer"
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
