function StreakDisplay({ current, longest }) {
  return (
    <div className="streak-grid">
      <article className="streak-card current">
        <p>Current Streak</p>
        <h2>
          <span role="img" aria-label="fire">
            🔥
          </span>{" "}
          {current}
        </h2>
      </article>

      <article className="streak-card longest">
        <p>Longest Streak</p>
        <h2>
          <span role="img" aria-label="trophy">
            🏆
          </span>{" "}
          {longest}
        </h2>
      </article>
    </div>
  );
}

export default StreakDisplay;
