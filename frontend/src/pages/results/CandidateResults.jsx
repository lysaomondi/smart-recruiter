import { Link, useParams } from "react-router-dom";
import ResultHeader from "../../components/results/ResultHeader";
import AssessmentResultCard from "../../components/results/AssessmentResultCard";
import ScoreOverview from "../../components/results/ScoreOverview";
import PerformanceStats from "../../components/results/PerformanceStats";
import SkillBreakdown from "../../components/results/SkillBreakdown";
import FeedbackCard from "../../components/results/FeedbackCard";
import RankingCard from "../../components/results/RankingCard";
import { mockResult, mockResults } from "../../utils/mockResults";

function CandidateResults() {
  const { candidateId } = useParams();

  const summaryResult = mockResults.find(
    (result) => String(result.id) === String(candidateId)
  );

  const result =
    String(candidateId) === String(mockResult.candidate.id)
      ? mockResult
      : summaryResult
        ? {
            ...mockResult,
            candidate: {
              id: summaryResult.id,
              name: summaryResult.candidateName,
            },
            assessment: {
              id: mockResult.assessment.id,
              title: summaryResult.assessmentTitle,
            },
            percentage: summaryResult.percentage,
            score: summaryResult.percentage,
            grade: summaryResult.grade,
          }
        : null;

  if (!result) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            Result not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We could not find a result for this candidate.
          </p>

          <Link
            to="/results"
            className="mt-5 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Back to Results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Back link */}
      <div className="mb-6">
        <Link
          to="/results"
          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          ← Back to Results
        </Link>
      </div>

      {/* Header */}
      <ResultHeader result={result} />

      <div className="space-y-8">
        {/* Assessment */}
        <AssessmentResultCard result={result} />

        {/* Score */}
        <ScoreOverview result={result} />

        {/* Statistics */}
        <PerformanceStats result={result} />

        {/* Skills */}
        <SkillBreakdown skills={result.skills} />

        {/* Ranking */}
        <RankingCard ranking={result.ranking} />

        {/* Feedback */}
        <FeedbackCard feedback={result.feedback} />

        {/* Feedback page */}
        <div className="flex justify-end">
          <Link
            to={`/results/candidates/${candidateId}/feedback`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            View Full Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CandidateResults;