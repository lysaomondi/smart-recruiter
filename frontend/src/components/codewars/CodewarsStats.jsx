function CodewarsStats({ user }) {
  const stats = [
    {
      label: "Honor",
      value: user.honor,
    },
    {
      label: "Overall Rank",
      value: user.ranks.overall.name,
    },
    {
      label: "Overall Score",
      value: user.ranks.overall.score,
    },
    {
      label: "Completed",
      value: user.codeChallenges.totalCompleted,
    },
  ];

  return (
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
        </div>
      ))}
    </div>
  );
}

export default CodewarsStats;