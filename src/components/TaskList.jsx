import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggleComplete }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <p>No tasks for this day yet.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
