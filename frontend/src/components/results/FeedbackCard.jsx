function FeedbackCard({ feedback }) {
  if (!feedback) {
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Recruiter Feedback
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Feedback about the candidate's assessment performance.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Strengths
          </h3>
          {feedback.strengths?.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {feedback.strengths.map((strength) => (
                <li
                  key={strength}
                  className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {strength}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-gray-500">
              No strengths recorded.
            </p>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Areas for Improvement
          </h3>
          {feedback.improvements?.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {feedback.improvements.map((improvement) => (
                <li
                  key={improvement}
                  className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700"
                >
                  {improvement}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-gray-500">
              No improvement areas recorded.
            </p>
          )}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-900">
          Overall Comment
        </h3>
        <div className="mt-3 rounded-lg bg-gray-50 p-4">
          <p className="text-sm leading-6 text-gray-600">
            {feedback.comment || "No overall comment available."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeedbackCard;