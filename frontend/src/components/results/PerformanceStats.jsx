function PerformanceStats({ result }) {
  const stats = [
    {
      label: "Score",
      value: `${result?.percentage ?? 0}%`,
      description: "Overall assessment score",
    },
    {
      label: "Correct Answers",
      value: `${result?.correctAnswers ?? 0}/${result?.totalQuestions ?? 0}`,
      description: "Questions answered correctly",
    },
    {
      label: "Time Taken",
      value: `${result?.timeTaken ?? 0} min`,
      description: "Total assessment time",
    },
    {
      label: "Grade",
      value: result?.grade ?? "N/A",
      description: "Overall performance grade",
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Performance Statistics
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of the candidate's assessment performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PerformanceStats;