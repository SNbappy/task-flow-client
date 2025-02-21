import { useState } from "react";
import axios from "axios";

const AddTask = ({ onTaskAdded, userId }) => {
    const [taskTitle, setTaskTitle] = useState("");

    const handleAddTask = async () => {
        if (!taskTitle.trim()) {
            console.error("Task title is required!");
            return;
        }

        if (!userId) {
            console.error("User ID is missing!");
            return;
        }

        const newTask = {
            title: taskTitle,
            status: "task",  // Default status
            userId
        };

        try {
            const res = await axios.post("http://localhost:5000/tasks", newTask);
            onTaskAdded({ ...newTask, _id: res.data.insertedId }); // Update UI
            setTaskTitle(""); // Clear input
        } catch (err) {
            console.error("Error adding task:", err.response?.data || err.message);
        }
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Enter task..."
                className="w-full p-2 border rounded"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={handleAddTask}>
                Add Task
            </button>
        </div>
    );
};

export default AddTask;
