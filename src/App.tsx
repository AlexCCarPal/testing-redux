import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { tasksStore } from "./sampleTasks";

interface TaskType {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const loadTasks = useEffect(() => {
    setTasks(tasksStore);
  }, []);
  const handleSaveTask = (task: TaskType) => {
    setTasks([...tasks, task]);
  };
  const handleEditTask = (taskId: number) => {
    // setTasks([...tasks, task]);
  };
  const handleDeleteTask = (taskId: number) => {
    const newTasks = tasks.filter((task: TaskType) => {
      return task.id !== taskId;
    });
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}

export default App;
