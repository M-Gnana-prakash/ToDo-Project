import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const inputRef = useRef()
    const navigate = useNavigate()

    // Fetch tasks only once on component mount
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:8080/task/getAllTasks", {
                    withCredentials: true
                });
                setTasks(response.data);
            } catch (err) {
                console.error("Failed to fetch tasks:", err.response?.data || err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Toggle complete/incomplete
    const handleToggle = async (taskId) => {
        try {
            await axios.post(`http://localhost:8080/task/toggle/${taskId}`, {}, {
                withCredentials: true
            });
            setTasks(prev =>
                prev.map(task =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                )
            );
        } catch (err) {
            console.error("Toggle failed:", err.message);
        }
    };

    // Delete task
    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8080/task/delete/${taskId}`, {
                withCredentials: true
            });
            setTasks(prev => prev.filter(task => task.id !== taskId));
        } catch (err) {
            console.error("Task not deleted:", err.message);
        }
    };

    // Add new task
    const handleAddNewTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const { data: newTaskData } = await axios.post("http://localhost:8080/task/createtask", {
                title: newTask,
                completed: false
            }, {
                withCredentials: true
            });
            setTasks(prevTasks => [...prevTasks, newTaskData]);
            setNewTask("");
            inputRef.current?.focus();
        } catch (err) {
            console.error("Error adding new task:", err.message);
        }
    };

    // Logout
    const handleSignOut = async () => {
        try {
            await axios.post("http://localhost:8080/user/logout", {}, {
                withCredentials: true
            });
            navigate("/");
        } catch (err) {
            console.log("Logout failed:", err.message);
        }
    };

    return (
        <>
            <div className="flex bg-indigo-600 justify-between py-3">
                <h1 className="text-white font-semibold text-3xl ml-5">TODO LIST</h1>
                <input
                    type="submit"
                    value="Logout"
                    className='mr-5 bg-white text-black px-2 rounded-md'
                    onClick={handleSignOut}
                />
            </div>

            <form onSubmit={handleAddNewTask}>
                <div className="mt-3 flex">
                    <input
                        ref={inputRef}
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task..."
                        className='w-4/5 ml-3 mr-10 border border-slate-950 rounded-md py-2 focus:outline-none text-lg'
                    />
                    <input
                        type="submit"
                        value="+"
                        className='bg-indigo-700 mr-3 w-1/5 rounded-lg text-white text-4xl'
                    />
                </div>
            </form>

            {isLoading ? (
                <p className="text-center text-gray-500 mt-4">Loading tasks...</p>
            ) : tasks.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No tasks available</p>
            ) : (
                tasks.map((task, index) => (
                    <div key={task.id || index} className="flex bg-gray-300 mx-3 mt-4 py-3 rounded-md px-3 justify-between items-center">
                        <input
                            type="checkbox"
                            className="size-7"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        <h1 className={`text-2xl ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h1>
                        <button onClick={() => handleDeleteTask(task.id)}>
                            <svg
                                className="w-10 h-10 text-red-600 font-medium"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                            >
                                <path d="M23 8H9c-.6 0-1-.4-1-1s.4-1 1-1h14c.6 0 1 .4 1 1s-.4 1-1 1zM22 28H10c-1.1 0-2-.9-2-2V10h16v16c0 1.1-.9 2-2 2zM12 5c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v1h-8V5zM24 6h-3V5c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v1H8c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2v16c0 2.2 1.8 4 4 4h12c2.2 0 4-1.8 4-4V10c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM16 26c.6 0 1-.4 1-1V13c0-.6-.4-1-1-1s-1 .4-1 1v12c0 .6.4 1 1 1zM11 26c.6 0 1-.4 1-1V13c0-.6-.4-1-1-1s-1 .4-1 1v12c0 .6.4 1 1 1zM21 26c.6 0 1-.4 1-1V13c0-.6-.4-1-1-1s-1 .4-1 1v12c0 .6.4 1 1 1z" />
                            </svg>
                        </button>
                    </div>
                ))
            )}
        </>
    );
};

export default Home;
