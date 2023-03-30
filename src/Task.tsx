import React from "react";

interface TaskProps {
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const Task: React.FC<TaskProps> = ({
  name,
  description,
  dueDate,
  completed,
  onDelete,
  onEdit,
}) => {
  return (
    <div className={`task ${completed ? "completed" : ""}`}>
      <div className="task__info">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>Due: {dueDate}</p>
      </div>
      <div className="task__actions">
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default Task;
