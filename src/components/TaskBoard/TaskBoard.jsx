import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const TaskBoard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        if (user) fetchTasks(user.uid);
    }, [user]);

    const fetchTasks = async (uid) => {
        const res = await axios.get(`http://localhost:5000/tasks/${uid}`);
        setTasks(res.data);
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedTasks = [...tasks];
        const movedTaskIndex = updatedTasks.findIndex(task => task._id === result.draggableId);

        if (movedTaskIndex !== -1) {
            updatedTasks[movedTaskIndex].status = result.destination.droppableId;
            setTasks(updatedTasks);
            try {
                await axios.put(`http://localhost:5000/tasks/${result.draggableId}`, {
                    status: result.destination.droppableId
                });
            } catch (error) {
                console.error("Failed to update task:", error);
                fetchTasks(user.uid);
            }
        }
    };

    const addTask = async () => {
        if (!newTask.trim()) return;

        const task = {
            _id: uuidv4(), // Temporary ID until saved in DB
            title: newTask,
            status: "todo",
            userId: user.uid
        };

        setTasks([...tasks, task]);
        setNewTask("");

        try {
            await axios.post("http://localhost:5000/tasks", task);
            fetchTasks(user.uid);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold text-center">Task Board</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a new task"
                    className="w-full p-2 border rounded"
                />
                <button onClick={addTask} className="px-4 py-2 text-white bg-blue-500 rounded">Add Task</button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-3 gap-6">
                    {["todo", "in-progress", "done"].map((status) => (
                        <Droppable key={status} droppableId={status}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-white shadow-md rounded p-4 min-h-[300px]"
                                >
                                    <h2 className="mb-4 text-lg font-semibold text-center uppercase">{status.replace("-", " ")}</h2>
                                    {tasks.filter(task => task.status === status).map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="p-3 mb-2 bg-gray-200 rounded-md shadow cursor-pointer"
                                                >
                                                    {task.title}
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

export default TaskBoard;
