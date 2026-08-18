import React from "react";

const TYPE_LABEL = { mcq: "MCQ", text: "Text", kata: "Kata" };
const TYPE_CLASS = {
  mcq: "bg-emerald-50 text-teal-dim",
  text: "bg-amber-50 text-amber-dim",
  kata: "bg-red-50 text-crimson-dim",
};

export default function QuestionList({ questions = [] }) {
  if (!questions.length) {
    return <p className="text-xs text-muted-2">No questions yet — add one on the left.</p>;
  }

  return (
    <table className="w-full border-collapse">
      <tbody>
        {questions.map((q) => (
          <tr key={q.id} className="border-b border-paper-line last:border-0">
            <td className="py-2.5 pr-2.5">
              <span
                className={`rounded px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase ${TYPE_CLASS[q.type]}`}
              >
                {TYPE_LABEL[q.type]}
              </span>
            </td>
            <td className="py-2.5 text-xs">{q.prompt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
