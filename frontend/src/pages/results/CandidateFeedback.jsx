import { Link, useParams } from "react-router-dom";
import FeedbackCard from "../../components/results/FeedbackCard";
import { mockResult } from "../../utils/mockResults";

function CandidateFeedback() {
  const { candidateId } = useParams();

  const result = mockResult;

  if (!result) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900">
            Result not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            We could not find feedback for this candidate.
          </p>

          <Link
            to="/recruiter/results"
            className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Results
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          to={`/recruiter/results/candidates/${candidateId}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          ← Back to Candidate Result
        </Link>

        <p className="mt-6 text-sm font-medium text-indigo-600">
          Candidate Feedback
        </p>

        <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
          {result.candidate?.name || "Candidate"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {result.assessment?.title || "Assessment"}
        </p>
      </div>

      {/* Feedback */}
      <FeedbackCard feedback={result.feedback} />
    </div>
  );
}

export default CandidateFeedback;