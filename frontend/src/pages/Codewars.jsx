import { useState } from "react";
import {
  getUser,
  getCompletedChallenges,
} from "../api/codewars";

import CodewarsHeader from "../components/codewars/CodewarsHeader";
import CodewarsStats from "../components/codewars/CodewarsStats";
import CodewarsProfile from "../components/codewars/CodewarsProfile";
import CompletedChallenges from "../components/codewars/CompletedChallenges";
import LanguageStats from "../components/codewars/LanguageStats";
import CodewarsSearch from "../components/codewars/CodewarsSearch";

function Codewars() {
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCodewarsData = async (username) => {
    try {
      setLoading(true);
      setError("");

      setUser(null);
      setChallenges([]);

      const userData = await getUser(username);

      setUser(userData);

      const completedData = await getCompletedChallenges(
        userData.id
      );

      setChallenges(completedData.data || []);
    } catch (err) {
      console.error("Codewars API error:", err);

      if (err.response?.status === 404) {
        setError(
          "Codewars user not found. Please check the username or ID."
        );
      } else {
        setError(
          "Failed to load Codewars data. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Search */}
      <CodewarsSearch
        onSearch={loadCodewarsData}
        loading={loading}
      />

      {/* Error */}
      {error && (
        <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {user && !loading && (
        <>
          {/* Header */}
          <CodewarsHeader user={user} />

          {/* Overall statistics */}
          <CodewarsStats user={user} />

          {/* Language performance */}
          <LanguageStats
            languages={user.ranks?.languages}
          />

          {/* Profile */}
          <div className="mt-8">
            <CodewarsProfile user={user} />
          </div>

          {/* Completed challenges */}
          <CompletedChallenges
            challenges={challenges}
          />
        </>
      )}

      {/* Initial state */}
      {!user && !loading && !error && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No candidate selected
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Enter a Codewars username or ID above to view
            their results.
          </p>
        </div>
      )}
    </div>
  );
}

export default Codewars;