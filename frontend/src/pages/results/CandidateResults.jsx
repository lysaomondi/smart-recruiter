import { useParams, Link } from "react-router-dom";

import ResultHeader from "../../components/results/ResultHeader";
import AssessmentResultCard from "../../components/results/AssessmentResultCard";
import ScoreOverview from "../../components/results/ScoreOverview";
import PerformanceStats from "../../components/results/PerformanceStats";
import SkillBreakdown from "../../components/results/SkillBreakdown";
import FeedbackCard from "../../components/results/FeedbackCard";
import RankingCard from "../../components/results/RankingCard";

import { mockResult } from "../../utils/mockResults";

function CandidateResults() {
  const { candidateId } = useParams();

  /*
   * For now, the detailed mock result represents Sahal.
   * Later this will come from the Results API.
   */
  const result =
    !candidateId || Number(candidateId) === mockResult.candidate.id
      ? mockResult
      : null;

  if (!result) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            Result Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            No detailed result is currently available for this
            candidate.
          </p>

          <Link
            to="/results"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Back to Results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          to="/results"
          className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          ← Back to Results
        </Link>
      </div>

      <ResultHeader result={result} />

      <div className="space-y-8">
        <AssessmentResultCard result={result} />

        <ScoreOverview result={result} />

        <PerformanceStats result={result} />

        <SkillBreakdown skills={result.skills} />

        <RankingCard ranking={result.ranking} />

        <FeedbackCard feedback={result.feedback} />
      </div>
    </div>
  );
}

export default CandidateResults;