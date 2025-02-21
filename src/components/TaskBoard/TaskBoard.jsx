import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Import Auth context

const TaskBoard = () => {
    const { user, loading } = useAuth(); // Get user authentication state
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");

    // Fetch tasks when the user is authenticated
    useEffect(() => {
        if (loading) return; // Wait until authentication state is determined
        if (!user) {
            console.error("User is not logged in!");
            return;
        }
        fetchTasks();
    }, [user, loading]);

    // Function to fetch tasks from backend
    const fetchTasks = () => {
        axios.get(`http://localhost:5000/tasks?userId=${user.uid}`)
            .then(res => setTasks(res.data))
            .catch(err => console.error("Error fetching tasks:", err));
    };

    // Function to add a new task
    const addTask = () => {
        if (!taskTitle.trim() || !user) return;

        const newTask = { title: taskTitle, userId: user.uid };

        axios.post("http://localhost:5000/tasks", newTask)
            .then(() => {
                setTaskTitle(""); // Clear input
                fetchTasks(); // Fetch updated tasks from backend
            })
            .catch(err => console.error("Error adding task:", err));
    };

    return (
        <div className="max-w-md p-4 mx-auto mt-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">Task Board</h2>
            {loading ? (
                <p>Loading...</p>
            ) : user ? (
                <>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Enter task..."
                            className="flex-1 p-2 border rounded"
                        />
                        <button
                            onClick={addTask}
                            className="px-4 py-2 text-white bg-green-500 rounded">
                            Add Task
                        </button>
                    </div>

                    <ul className="mt-4">
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <li key={task._id} className="p-2 mt-1 bg-gray-200 rounded">
                                    {task.title}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500">No tasks found.</p>
                        )}
                    </ul>
                </>
            ) : (
                <p className="text-red-500">User is not logged in! Please log in.</p>
            )}
        </div>
    );
};

export default TaskBoard;
