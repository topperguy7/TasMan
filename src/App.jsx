import { useEffect, useMemo, useState } from "react";
import Calendar from "./components/Calendar";
import TaskList from "./components/TaskList";
import StreakDisplay from "./components/StreakDisplay";
import { calculateStreakStats } from "./utils/streak";
import { toISODateLocal } from "./utils/date";

const TASKS_STORAGE_KEY = "task-calendar.tasks";
const STREAK_STORAGE_KEY = "task-calendar.streak";

function readStoredTasks() {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const today = toISODateLocal(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [monthDate, setMonthDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [tasks, setTasks] = useState(readStoredTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const tasksForSelectedDate = useMemo(
    () => tasks.filter((task) => task.date === selectedDate),
    [tasks, selectedDate],
  );

  const completedDateSet = useMemo(() => {
    const set = new Set();
    tasks.forEach((task) => {
      if (task.completed) set.add(task.date);
    });
    return set;
  }, [tasks]);

  const streakStats = useMemo(
    () => calculateStreakStats(tasks, today),
    [tasks, today],
  );

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(streakStats));
  }, [streakStats]);

  const handleAddTask = (event) => {
    event.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;

    const task = {
      id: crypto.randomUUID(),
      title,
      date: selectedDate,
      completed: false,
    };

    setTasks((prev) => [...prev, task]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const moveMonth = (offset) => {
    setMonthDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
    );
  };

  return (
    <>
    <div className="main-div">
      <h1>TasMan</h1>
    </div>
    <main className="app-shell">
      <section className="panel panel-calendar">
        <div className="panel-head">
          <h1>Task Calendar</h1>
          <p>Plan, complete, and keep your streak alive.</p>
        </div>

        <StreakDisplay current={streakStats.currentStreak} longest={streakStats.longestStreak} />

        <Calendar
          monthDate={monthDate}
          selectedDate={selectedDate}
          completedDates={completedDateSet}
          onSelectDate={setSelectedDate}
          onPrevMonth={() => moveMonth(-1)}
          onNextMonth={() => moveMonth(1)}
        />
      </section>

      <section className="panel panel-tasks">
        <div className="panel-head">
          <h2>{new Date(`${selectedDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h2>
          <p>{tasksForSelectedDate.length} task(s)</p>
        </div>

        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
            placeholder="Add a task for this date..."
            maxLength={140}
            required
          />
          <button type="submit">Add Task</button>
        </form>

        <TaskList
          tasks={tasksForSelectedDate}
          onDelete={handleDeleteTask}
          onToggleComplete={handleToggleTask}
        />
      </section>
    </main>
    </>
  );
}

export default App;