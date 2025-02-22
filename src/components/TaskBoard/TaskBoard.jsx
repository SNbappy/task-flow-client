import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "../../context/AuthContext";
import TaskColumn from "../TaskColumn/TaskColumn";
import TaskInput from "../TaskInput/TaskInput";

const TaskBoard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) fetchTasks(user.uid);
    }, [user]);

    const fetchTasks = async (uid) => {
        try {
            const res = await axios.get(`http://localhost:5000/tasks/${uid}`);
            setTasks(res.data);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
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

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="mb-6 text-2xl font-bold text-center">Task Board</h1>

            <TaskInput setTasks={setTasks} user={user} />

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-3 gap-6">
                    {["todo", "in-progress", "done"].map(status => (
                        <TaskColumn key={status} status={status} tasks={tasks} />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskBoard;
