import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    // Fetch tasks from the backend
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Add a new task
    const addTask = async () => {
        if (!newTaskTitle.trim()) return;

        const newTask = {
            title: newTaskTitle,
            description: newTaskDescription,
            category: "To-Do",
        };

        try {
            const response = await axios.post("/api/tasks", newTask);
            setTasks([...tasks, response.data]);
            setNewTaskTitle("");
            setNewTaskDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            await axios.delete(`/api/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Handle drag-and-drop
    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const updatedTasks = Array.from(tasks);
        const [movedTask] = updatedTasks.splice(source.index, 1);
        movedTask.category = destination.droppableId;
        updatedTasks.splice(destination.index, 0, movedTask);

        setTasks(updatedTasks);

        // Update task category in the backend
        axios.put(`/api/tasks/${movedTask._id}`, { category: movedTask.category });
    };

    // Render tasks for a specific category
    const renderTasks = (category) => {
        return tasks
            .filter((task) => task.category === category)
            .map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 mb-4 bg-white rounded-lg shadow"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{task.title}</h3>
                                <button onClick={() => deleteTask(task._id)}>
                                    <TrashIcon className="w-5 h-5 text-red-500" />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                    )}
                </Draggable>
            ));
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">TaskFlow Dashboard</h1>

            {/* Add Task Form */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="p-2 mr-2 border rounded"
                    maxLength={50}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="p-2 mr-2 border rounded"
                    maxLength={200}
                />
                <button
                    onClick={addTask}
                    className="p-2 text-white bg-blue-500 rounded"
                >
                    <PlusIcon className="inline-block w-5 h-5" /> Add Task
                </button>
            </div>

            {/* Task Categories */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {["To-Do", "In Progress", "Done"].map((category) => (
                        <Droppable key={category} droppableId={category}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="p-4 bg-gray-100 rounded-lg"
                                >
                                    <h2 className="mb-4 text-lg font-bold">{category}</h2>
                                    {renderTasks(category)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Dashboard;