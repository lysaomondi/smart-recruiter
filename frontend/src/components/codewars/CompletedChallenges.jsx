import ChallengeCard from "./ChallengeCard";

function CompletedChallenges({ challenges }) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Completed Challenges
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Challenges completed by the candidate.
        </p>
      </div>
      {challenges.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-gray-500">
          No completed challenges.
        </div>
      ) : (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CompletedChallenges;