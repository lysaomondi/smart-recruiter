function LanguageStats({ languages }) {
  const languageEntries = Object.entries(languages || {});

  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Language Performance
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Performance across programming languages.
        </p>
      </div>
      {languageEntries.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
          No language statistics available.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {languageEntries.map(([language, stats]) => (
            <div
              key={language}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold capitalize text-gray-900">
                  {language}
                </h3>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  {stats.name}
                </span>
              </div>
              <div className="mt-5">
                <p className="text-sm text-gray-500">
                  Score
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {stats.score}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Rank
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {stats.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LanguageStats;