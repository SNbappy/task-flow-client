import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        if (!newTaskTitle.trim()) return;

        const newTask = {
            title: newTaskTitle,
            description: newTaskDescription,
            category: "To-Do",
        };

        try {
            const response = await axios.post("http://localhost:5000/tasks", newTask);
            setTasks([...tasks, response.data]);
            setNewTaskTitle("");
            setNewTaskDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(source.index, 1);
        movedTask.category = destination.droppableId;
        updatedTasks.splice(destination.index, 0, movedTask);
        setTasks(updatedTasks);

        try {
            await axios.put(`http://localhost:5000/tasks/${movedTask._id}`, { category: movedTask.category });
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">TaskFlow Dashboard</h1>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-1/3 p-2 border rounded"
                    maxLength={50}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="w-1/3 p-2 border rounded"
                    maxLength={200}
                />
                <button onClick={addTask} className="flex items-center p-2 text-white bg-blue-500 rounded">
                    <PlusIcon className="w-5 h-5 mr-1" /> Add Task
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {["To-Do", "In Progress", "Done"].map((category) => (
                        <Droppable key={category} droppableId={category}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="p-4 bg-gray-100 rounded-lg min-h-[200px]"
                                >
                                    <h2 className="mb-4 text-lg font-bold">{category}</h2>
                                    {tasks
                                        .filter((task) => task.category === category)
                                        .map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow"
                                                    >
                                                        <div>
                                                            <h3 className="font-semibold">{task.title}</h3>
                                                            <p className="text-sm text-gray-600">{task.description}</p>
                                                        </div>
                                                        <button onClick={() => deleteTask(task._id)}>
                                                            <TrashIcon className="w-5 h-5 text-red-500" />
                                                        </button>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
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
