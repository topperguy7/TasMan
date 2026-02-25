import { monthGridDays, toISODateLocal } from "../utils/date";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({
  monthDate,
  selectedDate,
  completedDates,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}) {
  const days = monthGridDays(monthDate);
  const monthLabel = monthDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
  const today = toISODateLocal(new Date());

  return (
    <div className="calendar">
      <div className="calendar-head">
        <button type="button" onClick={onPrevMonth} aria-label="Previous month">
          {"<"}
        </button>
        <h3>{monthLabel}</h3>
        <button type="button" onClick={onNextMonth} aria-label="Next month">
          {">"}
        </button>
      </div>

      <div className="calendar-grid weekday-row">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekday-cell">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day) => {
          const dateKey = toISODateLocal(day.date);
          const isSelected = dateKey === selectedDate;
          const isToday = dateKey === today;
          const hasCompleted = completedDates.has(dateKey);

          const classes = [
            "day-cell",
            !day.inCurrentMonth ? "outside-month" : "",
            isSelected ? "selected" : "",
            isToday ? "today" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={dateKey}
              type="button"
              className={classes}
              onClick={() => onSelectDate(dateKey)}
            >
              <span>{day.date.getDate()}</span>
              {hasCompleted && <i className="completed-dot" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
