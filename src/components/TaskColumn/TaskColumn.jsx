import { useDrop } from "react-dnd";
import TaskCard from "../TaskCard/TaskCard";

const TaskColumn = ({ title, tasks, onDropTask, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "TASK",
        drop: (item) => onDropTask(item.id, title.toLowerCase().replace(/\s/g, "")),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`p-4 border rounded-lg w-80 shadow-lg ${isOver ? "bg-gray-200" : "bg-white"
                }`}
        >
            <h2 className="mb-3 text-xl font-semibold text-gray-700">{title}</h2>

            {/* Show input for adding tasks only in "To Do" column */}
            {title === "To Do" && <div className="mb-2">{children}</div>}

            <div className="space-y-3">
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskColumn;
