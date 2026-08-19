import { useParams } from "react-router-dom";

import ResultHeader from "../../components/results/ResultHeader";
import AssessmentResultCard from "../../components/results/AssessmentResultCard";
import ScoreOverview from "../../components/results/ScoreOverview";
import PerformanceStats from "../../components/results/PerformanceStats";
import SkillBreakdown from "../../components/results/SkillBreakdown";
import FeedbackCard from "../../components/results/FeedbackCard";
import RankingCard from "../../components/results/RankingCard";
import { mockResult } from "../../utils/mockResults";

function CandidateResults() {
  const { id } = useParams();

  const result = mockResult;

  console.log("Viewing result:", id);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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