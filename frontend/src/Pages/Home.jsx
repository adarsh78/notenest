import React, { useContext, useState } from "react";
import { TodoContext } from "../Context/TodoContextProvider.jsx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

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
    createTodo(newTodo);
    setNewTodo({
        title: "",
        description: ""
    });
    setIsInputOpen(false);
  }

  return (
    <>

      <div>
        {!isInputOpen && (
          <div
            onClick={handleInputBoxOpen}
            className="w-[30rem] mx-auto border-[1px] border-zinc-700 rounded-md mt-3 p-2 cursor-pointer"
          >
            <span>Take a note...</span>
          </div>
        )}

        {isInputOpen && (
          <div className="w-[30rem] mx-auto border-[1px] border-zinc-700 rounded-md mt-3 p-2 cursor-pointer flex flex-col gap-2">
            <input
              className="p-1 text-xl focus:outline-none"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              aria-label="title"
              value={newTodo.title}
              onChange={handleInputChange}
            />

            <input
              className="px-1 focus:outline-none"
              type="text"
              name="description"
              id="description"
              placeholder="Take a note..."
              aria-label="description"
              value={newTodo.description}
              onChange={handleInputChange}
            />

            <button onClick={handleAddTodo} className="flex justify-end">Add</button>
            <button onClick={handleInputBoxClose} className="flex justify-end">
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
    </>
  );
};

export default Home;
