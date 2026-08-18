import ScoreOverview from "../../components/results/ScoreOverview";
import PerformanceStats from "../../components/results/PerformanceStats";
import SkillBreakdown from "../../components/results/SkillBreakdown";
import FeedbackCard from "../../components/results/FeedbackCard";
import { mockResult } from "../../utils/mockResults";

function CandidateResults() {
  const result = mockResult;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">
          Assessment Results
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          {result.candidate.name}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {result.assessment.title}
        </p>
      </div>

      {/* Overall score */}
      <ScoreOverview result={result} />

      {/* Statistics */}
      <PerformanceStats result={result} />

      {/* Skills */}
      <SkillBreakdown skills={result.skills} />

      {/* Feedback */}
      <FeedbackCard feedback={result.feedback} />
    </div>
  );
}

export default CandidateResults;