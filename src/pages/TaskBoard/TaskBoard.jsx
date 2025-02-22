import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAuth } from "../../context/AuthContext";
import TaskItem from "../../components/TaskItem/TaskItem";
import { TASK_STATUSES } from "../../utils/constants";

const TaskBoard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        if (user) fetchTasks(user.uid);
    }, [user]);

    const fetchTasks = async (uid) => {
        try {
            const res = await axios.get(`http://localhost:5000/tasks/${uid}`);
            console.log("Fetched tasks:", res.data);

            const filteredTasks = res.data.filter(task => task.title !== null);
            setTasks(filteredTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleTaskDrop = async (draggedTask, destination) => {
        if (!destination) return;

        const updatedTask = {
            ...draggedTask,
            status: destination.droppableId
        };

        try {
            await axios.put(`http://localhost:5000/tasks/${draggedTask._id}`, updatedTask);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === draggedTask._id ? updatedTask : task
                )
            );
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        const draggedTask = tasks.find(task => task._id === result.draggableId);
        if (!draggedTask) return;

        if (source.droppableId === destination.droppableId) {
            const updatedTasks = [...tasks];
            const [movedTask] = updatedTasks.splice(source.index, 1);
            updatedTasks.splice(destination.index, 0, movedTask);
            setTasks(updatedTasks);
        } else {
            await handleTaskDrop(draggedTask, destination);
        }
    };

    const addTask = async () => {
        if (!newTask.trim()) return;

        const task = {
            title: newTask,
            status: "todo",
            userId: user?.uid,
        };

        try {
            const res = await axios.post("http://localhost:5000/tasks", task);
            setTasks([...tasks, res.data]);
            setNewTask("");
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
                <button
                    onClick={addTask}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                    Add Task
                </button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-3 gap-6">
                    {Object.values(TASK_STATUSES).map((status) => (
                        <Droppable key={status} droppableId={status}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-white shadow-md rounded p-4 min-h-[300px]"
                                >
                                    <h2 className="mb-4 text-lg font-semibold text-center uppercase">
                                        {status.replace("-", " ")}
                                    </h2>
                                    {tasks
                                        .filter((task) => task.status === status)
                                        .map((task, index) => (
                                            <TaskItem
                                                key={task._id}
                                                task={task}
                                                index={index}
                                            />
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
