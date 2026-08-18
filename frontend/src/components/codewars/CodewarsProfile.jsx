function CodewarsProfile({ user }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">
        Profile
      </h2>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">
            Username
          </span>

          <span className="text-sm font-medium text-gray-900">
            {user.username}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">
            Overall Rank
          </span>

          <span className="text-sm font-medium text-gray-900">
            {user.ranks.overall.name}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">
            Authored Challenges
          </span>

          <span className="text-sm font-medium text-gray-900">
            {user.codeChallenges.totalAuthored}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">
            Completed Challenges
          </span>

          <span className="text-sm font-medium text-gray-900">
            {user.codeChallenges.totalCompleted}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CodewarsProfile;