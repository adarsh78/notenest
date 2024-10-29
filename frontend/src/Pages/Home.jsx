import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../toastMessage.js';

const Home = () => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState("")

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"))
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
        handleSuccess("User logged out successfully");
    }

    const fetchTodos = async () => {
        try {
            const url = "http://localhost:3010/todos";
            const response = await fetch(url, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });

            const result = await response.json();
            setTodos(result.data);

        } catch (error) {
            console.log(`Error fetching the todos: ${error.message}`)
        }
    }

    console.log("Todos are: ", todos);

    useEffect(() => {
        fetchTodos();
    }, [])
  return (
    <>
    <h1>welcome {loggedInUser}</h1>
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Home