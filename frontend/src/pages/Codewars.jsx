import { useEffect, useState } from "react";
import {
  getUser,
  getCompletedChallenges,
} from "../api/codewars";

import CodewarsHeader from "../components/codewars/CodewarsHeader";
import CodewarsStats from "../components/codewars/CodewarsStats";
import CodewarsProfile from "../components/codewars/CodewarsProfile";
import CompletedChallenges from "../components/codewars/CompletedChallenges";
import LanguageStats from "../components/codewars/LanguageStats";

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

        setChallenges(completedData.data);
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
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-gray-500">
          Loading Codewars data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Page Header */}
      <CodewarsHeader user={user} />

      {/* Overall Statistics */}
      <CodewarsStats user={user} />

      {/* Language Performance */}
      <LanguageStats
        languages={user.ranks?.languages}
      />

      {/* Profile Information */}
      <div className="mt-8">
        <CodewarsProfile user={user} />
      </div>

      {/* Completed Challenges */}
      <CompletedChallenges challenges={challenges} />
    </div>
  );
}

export default Codewars;