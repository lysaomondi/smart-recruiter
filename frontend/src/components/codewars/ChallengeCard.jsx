function ChallengeCard({ challenge }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {challenge.name}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Completed on{" "}
            {new Date(challenge.completedAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {challenge.completedLanguages.map((language) => (
            <span
              key={language}
              className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;