import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard/TaskCard";

const TaskColumn = ({ title, tasks = [], id, addTask }) => {
    const [newTask, setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask.trim() === "") return;
        addTask(id, newTask);
        setNewTask(""); // Clear input after adding
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-80">
            <h2 className="mb-3 text-lg font-semibold">{title}</h2>

            {/* Task Input Field */}
            <div className="flex mb-3">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task..."
                    className="w-full p-2 border rounded"
                />
                <button
                    onClick={handleAddTask}
                    className="px-3 py-2 ml-2 text-white bg-blue-500 rounded"
                >
                    Add
                </button>
            </div>

            {/* Draggable Task List */}
            <Droppable droppableId={id} isDropDisabled={false}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="p-2 my-2 bg-gray-100 rounded-lg"
                                    >
                                        <TaskCard task={task} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TaskColumn;
