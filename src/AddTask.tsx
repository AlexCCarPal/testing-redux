import { useState } from "react";

interface TaskType {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

interface AddTaskProps {
  onSaveTask: (task: TaskType) => void;
}
const AddTask: React.FC<AddTaskProps> = ({ onSaveTask }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: TaskType = {
      id: Math.floor(Math.random() * 10000),
      name,
      description,
      dueDate,
      completed: false,
    };
    onSaveTask(newTask);
    setName("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Due date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <button type="submit">Add task</button>
    </form>
  );
};

export default AddTask;
