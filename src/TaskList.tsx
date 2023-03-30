import Task from "./Task";

interface TaskListProps {
  tasks: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }[];
  onDeleteTask: (taskId: number) => void;
  onEditTask: (taskId: number) => void;
}
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onEditTask,
}) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          name={task.name}
          description={task.description}
          dueDate={task.dueDate}
          completed={task.completed}
          onDelete={() => onDeleteTask(task.id)}
          onEdit={() => onEditTask(task.id)}
        />
      ))}
    </div>
  );
};

export default TaskList;
