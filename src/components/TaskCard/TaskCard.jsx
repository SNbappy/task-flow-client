import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index }) => {
    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="p-3 my-2 bg-white border-l-4 border-blue-500 rounded-lg shadow-md"
                >
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
