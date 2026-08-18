function ResultHeader({ result }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-medium text-indigo-600">
        Assessment Results
      </p>

      <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
        {result?.candidate?.name || "Candidate"}
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        {result?.assessment?.title || "Assessment"}
      </p>
    </div>
  );
}

export default ResultHeader;