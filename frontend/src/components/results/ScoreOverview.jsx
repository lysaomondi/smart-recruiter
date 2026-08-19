function ScoreOverview({ result }) {
  const percentage = result?.percentage ?? 0;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Overall Score
          </p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-900">
              {percentage}%
            </span>
            <span className="mb-1 text-sm text-gray-500">
              overall
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {result?.correctAnswers ?? 0} of{" "}
            {result?.totalQuestions ?? 0} questions correct
          </p>
        </div>
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-indigo-100">
          <span className="text-xl font-bold text-indigo-600">
            {percentage}%
          </span>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs font-medium text-gray-500">
          <span>Performance</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}

export default ScoreOverview;