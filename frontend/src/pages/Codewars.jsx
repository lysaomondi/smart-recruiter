import { useEffect, useState } from "react";
import {
  getUser,
  getCompletedChallenges,
} from "../api/codewars";

function Codewars() {
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = "69d4fb3d55b08a66bdc74c76";

  useEffect(() => {
    const loadCodewarsData = async () => {
      try {
        setLoading(true);
        setError("");

        const userData = await getUser(username);
        setUser(userData);

        const completedData = await getCompletedChallenges(
          userData.id
        );

        setChallenges(completedData.data || []);
      } catch (err) {
        console.error("Codewars API error:", err);
        setError("Failed to load Codewars data.");
      } finally {
        setLoading(false);
      }
    };

    loadCodewarsData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-56 rounded bg-slate-200" />
            <div className="h-32 rounded-xl bg-white" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="h-28 rounded-xl bg-white" />
              <div className="h-28 rounded-xl bg-white" />
              <div className="h-28 rounded-xl bg-white" />
              <div className="h-28 rounded-xl bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const languageCounts = {};

  challenges.forEach((challenge) => {
    challenge.completedLanguages.forEach((language) => {
      languageCounts[language] =
        (languageCounts[language] || 0) + 1;
    });
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Candidate Results
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Codewars Results
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Coding activity and performance from Codewars.
          </p>
        </div>

        {/* Candidate */}
        {user && (
          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {user.username
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {user.username}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Codewars Profile
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Overall Rank
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {user.ranks.overall.name}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Statistics */}
        {user && (
          <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              label="Honor"
              value={user.honor}
            />

            <StatCard
              label="Overall Score"
              value={user.ranks.overall.score}
            />

            <StatCard
              label="Completed"
              value={user.codeChallenges.totalCompleted}
            />

            <StatCard
              label="Authored"
              value={user.codeChallenges.totalAuthored}
            />

          </section>
        )}

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Languages */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Languages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Languages used in completed challenges.
            </p>

            <div className="mt-5 space-y-4">
              {Object.entries(languageCounts).map(
                ([language, count]) => {
                  const percentage =
                    (count / challenges.length) * 100;

                  return (
                    <div key={language}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium capitalize text-slate-700">
                          {language}
                        </span>

                        <span className="text-sm text-slate-500">
                          {count}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* Completed Challenges */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-slate-900">
                Completed Challenges
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recent challenges completed by the candidate.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-5 transition hover:bg-slate-50 sm:px-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <h3 className="font-medium text-slate-900">
                        {challenge.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {challenge.completedLanguages.map(
                          (language) => (
                            <span
                              key={language}
                              className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700"
                            >
                              {language}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        challenge.completedAt
                      ).toLocaleDateString()}
                    </p>

                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default Codewars;