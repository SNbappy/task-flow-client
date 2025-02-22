import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "../TaskItem/TaskItem";

const TaskColumn = ({ status, tasks }) => {
    return (
        <Droppable droppableId={status}>
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
                        .filter(task => task.status === status)
                        .map((task, index) => (
                            <TaskItem key={task._id} task={task} index={index} />
                        ))}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TaskColumn;
