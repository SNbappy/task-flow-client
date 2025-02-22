import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TaskInput = ({ setTasks, user }) => {
    const [newTask, setNewTask] = useState("");

    const addTask = async () => {
        if (!newTask.trim()) return;

        const task = {
            _id: uuidv4(), // Temporary ID until saved in DB
            title: newTask,
            status: "todo",
            userId: user.uid
        };

        setTasks(prev => [...prev, task]);
        setNewTask("");

        try {
            await axios.post("http://localhost:5000/tasks", task);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a new task"
                className="w-full p-2 border rounded"
            />
            <button onClick={addTask} className="px-4 py-2 text-white bg-blue-500 rounded">
                Add Task
            </button>
        </div>
    );
};

export default TaskInput;
