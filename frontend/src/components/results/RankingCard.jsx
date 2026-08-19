function RankingCard({ ranking }) {
  if (!ranking) {
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Candidate Ranking
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Candidate performance compared with other candidates.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Rank
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            #{ranking.position ?? "N/A"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Total Candidates
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {ranking.totalCandidates ?? "N/A"}
          </p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Percentile
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {ranking.percentile != null
              ? `${ranking.percentile}%`
              : "N/A"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default RankingCard;