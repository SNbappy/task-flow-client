import { Draggable } from "@hello-pangea/dnd";

const TaskItem = ({ task, index }) => {
    return (
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
    );
};

export default TaskItem;
