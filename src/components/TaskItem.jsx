function TaskItem({ task, onDelete, onToggleComplete }) {
  return (
    <li className={`task-item ${task.completed ? "done" : ""}`}>
      <label className="task-main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <span>{task.title}</span>
      </label>

      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
