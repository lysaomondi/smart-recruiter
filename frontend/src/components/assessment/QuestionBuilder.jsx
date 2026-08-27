import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuestionToAssessment } from "../../store/slices/assessmentSlice";
import * as assessmentService from "../../services/assessmentService";
import Button from "../common/Button";
import Input from "../common/Input";

const QUESTION_TYPES = [
  { key: "mcq", label: "Multiple choice" },
  { key: "text", label: "Free text" },
  { key: "kata", label: "Coding kata" },
];

export default function QuestionBuilder({ assessmentId }) {
  const dispatch = useDispatch();
  const [type, setType] = useState("mcq");
  const [prompt, setPrompt] = useState("");
  const [codewarsQuery, setCodewarsQuery] = useState("");
  const [choices, setChoices] = useState(["", ""]);
  const [correctChoice, setCorrectChoice] = useState(0);
  const [fetchingKata, setFetchingKata] = useState(false);

  const handleFetchFromCodewars = async () => {
    if (!codewarsQuery.trim()) return;
    setFetchingKata(true);
    try {
      const response = await assessmentService.fetchCodewarsKata(
        codewarsQuery.trim(),
      );
      setPrompt(response.kata.description || response.kata.name || "");
    } finally {
      setFetchingKata(false);
    }
  };

  const handleAdd = () => {
    if (!prompt.trim()) return;
    const question = {
      type,
      prompt,
      source: type === "kata" ? "codewars" : "manual",
    };
    if (type === "mcq") {
      question.choices = choices
        .map((text, index) => ({
          text: text.trim(),
          isCorrect: index === correctChoice,
        }))
        .filter(({ text }) => text);
    }
    dispatch(
      addQuestionToAssessment({
        assessmentId,
        question,
      }),
    );
    setPrompt("");
    setChoices(["", ""]);
    setCorrectChoice(0);
  };

  return (
    <div>
      <div className="mb-3.5">
        <label className="mb-1.5 block text-xs font-semibold text-ink">
          Add question — type
        </label>
        <div className="mt-1.5 flex gap-2">
          {QUESTION_TYPES.map((qt) => (
            <div
              key={qt.key}
              onClick={() => setType(qt.key)}
              className={`flex-1 cursor-pointer rounded-lg border px-2.5 py-2.5 text-center text-xs font-semibold ${
                type === qt.key
                  ? "border-brand-teal bg-emerald-50 text-teal-dim"
                  : "border-paper-line text-muted-2"
              }`}
            >
              {qt.label}
            </div>
          ))}
        </div>
      </div>

      <Input
        as="textarea"
        label="Question prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g. Which data structure gives O(1) average lookup time?"
      />

      {type === "mcq" && (
        <div className="mb-3.5 space-y-2">
          <p className="text-xs font-semibold text-ink">Choices</p>
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="radio"
                name="correct-choice"
                checked={correctChoice === index}
                onChange={() => setCorrectChoice(index)}
                aria-label={`Mark choice ${index + 1} correct`}
              />
              <input
                className="w-full rounded-lg border border-paper-line bg-slate-50 px-3 py-2 text-sm text-ink outline-none focus:border-brand-teal"
                value={choice}
                onChange={(event) =>
                  setChoices((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? event.target.value : item,
                    ),
                  )
                }
                placeholder={`Choice ${index + 1}`}
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => setChoices((current) => [...current, ""])}
          >
            + Add choice
          </Button>
        </div>
      )}

      {type === "kata" && (
        <div className="mb-3.5 flex gap-2">
          <Input
            label="Codewars kata ID or slug"
            value={codewarsQuery}
            onChange={(event) => setCodewarsQuery(event.target.value)}
            placeholder="e.g. valid-braces"
          />
          <Button
            variant="outline"
            onClick={handleFetchFromCodewars}
            disabled={fetchingKata}
          >
            {fetchingKata ? "Fetching..." : "Fetch kata"}
          </Button>
        </div>
      )}

      <Button variant="teal" onClick={handleAdd}>
        + Add question
      </Button>
    </div>
  );
}
