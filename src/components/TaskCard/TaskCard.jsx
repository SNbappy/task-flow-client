import { useDrag } from "react-dnd";

const TaskCard = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-3 my-2 bg-white border-l-4 border-blue-500 rounded-lg shadow-md ${isDragging ? "opacity-50" : ""
                }`}
        >
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
        </div>
    );
};

export default TaskCard;
