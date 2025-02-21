import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "../TaskColumn/TaskColumn";

const initialTasks = {
    "to-do": [],
    "in-progress": [],
    "done": []
};

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialTasks);

    // Fetch tasks from backend (MongoDB via Express API)
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:5000/tasks");
                const data = await response.json();

                // Organize tasks into categories
                const organizedTasks = {
                    "to-do": data.filter(task => task.category === "To-Do"),
                    "in-progress": data.filter(task => task.category === "In Progress"),
                    "done": data.filter(task => task.category === "Done")
                };

                setTasks(organizedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    // Handle drag-and-drop functionality
    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        // Copy tasks
        const updatedTasks = { ...tasks };
        const draggedTask = updatedTasks[source.droppableId][source.index];

        // Remove from the old category
        updatedTasks[source.droppableId].splice(source.index, 1);

        // Add to the new category
        updatedTasks[destination.droppableId].splice(destination.index, 0, {
            ...draggedTask,
            category: destination.droppableId
        });

        setTasks(updatedTasks);

        // Update backend with new category
        try {
            await fetch(`http://localhost:5000/tasks/${draggedTask._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category: destination.droppableId })
            });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
                <TaskColumn title="To-Do" tasks={tasks["to-do"]} id="to-do" />
                <TaskColumn title="In Progress" tasks={tasks["in-progress"]} id="in-progress" />
                <TaskColumn title="Done" tasks={tasks["done"]} id="done" />
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
