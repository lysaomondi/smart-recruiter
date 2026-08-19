function AssessmentResultCard({ result }) {
  if (!result) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Assessment
          </p>
          <h2 className="mt-1 text-lg font-semibold text-gray-900">
            {result.assessment?.title || "Assessment"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Candidate: {result.candidate?.name || "Unknown"}
          </p>
        </div>
        <div className="rounded-xl bg-indigo-50 px-4 py-3 text-center">
          <p className="text-xs font-medium text-indigo-600">
            Grade
          </p>
          <p className="mt-1 text-2xl font-bold text-indigo-700">
            {result.grade || "N/A"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AssessmentResultCard;