import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import axios from "axios";

const TaskItem = ({ task, index, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditedTask({ title: task.title, description: task.description });
    };

    const handleChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!editedTask.title.trim()) return;
        try {
            await axios.put(`http://localhost:5000/tasks/${task._id}`, {
                title: editedTask.title,
                description: editedTask.description
            });
            onUpdate(task._id, editedTask);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center justify-between p-3 mb-2 bg-gray-200 rounded-md shadow cursor-pointer"
                >
                    <div className="flex-grow">
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={editedTask.title}
                                    onChange={handleChange}
                                    className="w-full p-1 mb-1 border rounded"
                                />
                                <textarea
                                    name="description"
                                    value={editedTask.description}
                                    onChange={handleChange}
                                    className="w-full p-1 border rounded"
                                />
                                <div className="flex justify-end gap-2 mt-2">
                                    <button onClick={handleSave} className="px-2 py-1 text-white bg-green-500 rounded">Save</button>
                                    <button onClick={handleEditToggle} className="px-2 py-1 text-white bg-red-500 rounded">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h3 className="font-semibold">{task.title}</h3>
                                {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
                            </div>
                        )}
                    </div>

                    {!isEditing && (
                        <button onClick={handleEditToggle} className="px-2 py-1 text-sm text-white bg-blue-500 rounded">
                            Edit
                        </button>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;
