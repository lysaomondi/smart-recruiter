import { Link } from "react-router-dom";
import ScoreOverview from "../../components/results/ScoreOverview";
import PerformanceStats from "../../components/results/PerformanceStats";
import SkillBreakdown from "../../components/results/SkillBreakdown";
import FeedbackCard from "../../components/results/FeedbackCard";
import { mockResult } from "../../utils/mockResults";

function MyResults() {
  const result = mockResult;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">
          My Results
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          {result.candidate.name}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {result.assessment.title}
        </p>
      </div>

      {/* Result summary */}
      <div className="space-y-8">
        <ScoreOverview result={result} />

        <PerformanceStats result={result} />

        <SkillBreakdown skills={result.skills} />

        <FeedbackCard feedback={result.feedback} />
      </div>

      {/* Codewars */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Codewars Performance
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your Codewars coding performance and completed
            challenges.
          </p>
        </div>

        <Link
          to="/codewars"
          className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          View Codewars Results
        </Link>
      </div>
    </div>
  );
}

export default MyResults;