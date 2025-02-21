import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskDetails = () => {
    const { id } = useParams(); // Get task ID from URL
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/tasks/${id}`);
                setTask(response.data);
            } catch (err) {
                setError("Failed to load task details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await axios.delete(`http://localhost:5000/tasks/${id}`);
                navigate("/tasks"); // Redirect to task list after deletion
            } catch (err) {
                setError("Failed to delete the task.");
            }
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">{task.title}</h1>
            <p className="mt-2 text-gray-600">{task.description}</p>
            <p className="mt-2 text-sm text-gray-500">Status: {task.status}</p>

            <div className="flex gap-4 mt-4">
                <button
                    onClick={() => navigate(`/edit-task/${id}`)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Edit Task
                </button>
                <button
                    onClick={handleDelete}
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                    Delete Task
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;
