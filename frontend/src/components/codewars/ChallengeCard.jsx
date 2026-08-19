import { useState } from "react";
import { getCodeChallenge } from "../../api/codewars";
import Modal from "../common/Modal";

function ChallengeCard({ challenge }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleViewDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCodeChallenge(challenge.id);
      setDetails(data);
    } catch (err) {
      console.error("Challenge details error:", err);
      setError("Failed to load challenge details.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setDetails(null);
    setError("");
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {challenge.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Completed on{" "}
              {new Date(
                challenge.completedAt
              ).toLocaleDateString()}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {challenge.completedLanguages.map(
                (language) => (
                  <span
                    key={language}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700"
                  >
                    {language}
                  </span>
                )
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleViewDetails}
            disabled={loading}
            className="shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Loading..." : "View Details"}
          </button>
        </div>
      </div>
      {details && (
        <Modal
          isOpen={true}
          onClose={closeModal}
        >
          <div className="max-h-[80vh] overflow-y-auto">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-gray-900">
                  {details.name}
                </h2>
                {details.rank && (
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {details.rank.name}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {details.category}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Total Attempts
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {details.totalAttempts?.toLocaleString() ||
                    "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Total Completed
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {details.totalCompleted?.toLocaleString() ||
                    "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Stars
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {details.totalStars ?? "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Vote Score
                </p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {details.voteScore ?? "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">
                Languages
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {details.languages?.map((language) => (
                  <span
                    key={language}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
            {details.tags?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900">
                  Tags
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {details.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">
                Description
              </h3>
              <div className="mt-3 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                {details.description ||
                  "No description available."}
              </div>
            </div>
            {details.url && (
              <div className="mt-6">
                <a
                  href={details.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View on Codewars →
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
      {error && (
        <div className="mt-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
    </>
  );
}

export default ChallengeCard;