import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchAssessmentDetails,
  startAssessmentAttempt,
  submitAnswer,
  submitAssessment,
} from "../../store/slices/assessmentSlice";

import Timer from "../../components/common/Timer";
import Whiteboard from "../../components/interview/Whiteboard";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

const TakeAssessment = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentAssessment,
    currentAttempt,
    loading,
    error,
  } = useSelector((state) => state.assessment);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const initializeAssessment = async () => {
      try {
        const assessmentResult = await dispatch(
          fetchAssessmentDetails(assessmentId)
        );

        if (assessmentResult.meta.requestStatus === "rejected") {
          return;
        }

        const attemptResult = await dispatch(
          startAssessmentAttempt(assessmentId)
        );

        if (attemptResult.meta.requestStatus === "fulfilled") {
          setTimerRunning(true);
        }
      } catch (err) {
        console.error("Failed to initialize assessment:", err);
      }
    };

    initializeAssessment();
  }, [dispatch, assessmentId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  };

  const handleSaveAnswer = async (questionId) => {
    if (!currentAttempt) return;

    const answer = answers[questionId];

    if (
      answer === undefined ||
      answer === null ||
      answer === ""
    ) {
      return;
    }

    try {
      let answerData = {
        question: questionId,
      };

      const question = currentAssessment.questions.find(
        (item) => item.id === questionId
      );

      if (!question) return;

      if (question.type === "mcq") {
        const selectedChoice = question.choices?.find(
          (choice) => choice.text === answer
        );

        if (selectedChoice) {
          answerData.selected_choice_ids = [selectedChoice.id];
        }
      }

      if (question.type === "text") {
        answerData.text_answer = answer;
      }

      if (question.type === "kata") {
        if (typeof answer === "object") {
          answerData.bdd_answer = answer.bdd || "";
          answerData.pseudocode_answer = answer.pseudocode || "";
          answerData.code_answer = answer.code || "";
        } else {
          answerData.code_answer = answer;
        }
      }

      await dispatch(
        submitAnswer({
          attemptId: currentAttempt.id,
          answerData,
        })
      );
    } catch (err) {
      console.error("Failed to save answer:", err);
    }
  };

  const handleNext = async () => {
    const currentQuestion =
      currentAssessment.questions[currentQuestionIndex];

    await handleSaveAnswer(currentQuestion.id);

    if (
      currentQuestionIndex <
      currentAssessment.questions.length - 1
    ) {
      setCurrentQuestionIndex((previous) => previous + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((previous) => previous - 1);
    }
  };

  const handleSubmit = async () => {
    if (
      !window.confirm(
        "Are you sure you want to submit the assessment?"
      )
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const currentQuestion =
        currentAssessment.questions[currentQuestionIndex];

      await handleSaveAnswer(currentQuestion.id);

      const result = await dispatch(
        submitAssessment(currentAttempt.id)
      );

      if (result.meta.requestStatus === "fulfilled") {
        setTimerRunning(false);

        navigate("/interviewee/results");
      }
    } catch (err) {
      console.error("Failed to submit assessment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeUp = async () => {
    setTimerRunning(false);

    if (!currentAttempt) return;

    try {
      await dispatch(
        submitAssessment(currentAttempt.id)
      );

      navigate("/interviewee/results");
    } catch (err) {
      console.error("Failed to auto-submit assessment:", err);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!currentAssessment || !currentAttempt) {
    return null;
  }

  const questions = currentAssessment.questions || [];

  if (questions.length === 0) {
    return (
      <div className="take-assessment-container">
        <h2>No questions available</h2>
        <p>This assessment does not contain any questions yet.</p>

        <Button
          variant="secondary"
          onClick={() => navigate("/interviewee/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const totalQuestions = questions.length;

  const progress =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "mcq":
        return (
          <div className="multiple-choice-options">
            {currentQuestion.choices?.map((choice) => (
              <label
                key={choice.id}
                className="option-label"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={choice.text}
                  checked={
                    answers[currentQuestion.id] ===
                    choice.text
                  }
                  onChange={() =>
                    handleAnswerChange(
                      currentQuestion.id,
                      choice.text
                    )
                  }
                />

                <span>{choice.text}</span>
              </label>
            ))}
          </div>
        );

      case "text":
        return (
          <div className="subjective-answer">
            <textarea
              rows="8"
              placeholder="Type your answer here..."
              value={
                answers[currentQuestion.id] || ""
              }
              onChange={(event) =>
                handleAnswerChange(
                  currentQuestion.id,
                  event.target.value
                )
              }
            />
          </div>
        );

      case "kata":
        return (
          <Whiteboard
            question={currentQuestion}
            answer={answers[currentQuestion.id]}
            onAnswerChange={handleAnswerChange}
          />
        );

      default:
        return (
          <p>
            Unsupported question type:{" "}
            {currentQuestion.type}
          </p>
        );
    }
  };

  const isAnswerSaved = (questionId) => {
    return currentAttempt.answer_records?.some(
      (answer) => answer.question === questionId
    );
  };

  return (
    <div className="take-assessment-container">

      <div className="assessment-header">

        <h2>{currentAssessment.title}</h2>

        <Timer
          initialTime={
            currentAttempt.remaining_seconds ||
            currentAssessment.timeLimitMinutes * 60
          }
          onTimeUp={handleTimeUp}
          isRunning={timerRunning}
        />

        <Button
          variant="danger"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit Assessment"}
        </Button>

      </div>

      <div className="assessment-progress">

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <span className="progress-text">
          Question {currentQuestionIndex + 1} of{" "}
          {totalQuestions}
        </span>

      </div>

      <div className="question-container">

        <div className="question-header">

          <span className="question-type">
            {currentQuestion.type
              .replace("_", " ")
              .toUpperCase()}
          </span>

          <span className="question-points">
            {currentQuestion.type === "mcq"
              ? "1 point"
              : "Manual review"}
          </span>

          {isAnswerSaved(currentQuestion.id) && (
            <span className="answer-status">
              Saved
            </span>
          )}

        </div>

        <div className="question-content">

          <p className="question-text">
            {currentQuestion.prompt}
          </p>

          {renderQuestion()}

        </div>

        <div className="question-actions">

          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <Button
            variant="primary"
            onClick={() =>
              handleSaveAnswer(currentQuestion.id)
            }
          >
            Save Answer
          </Button>

          {currentQuestionIndex ===
          totalQuestions - 1 ? (
            <Button
              variant="success"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : "Submit Assessment"}
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}

        </div>

      </div>

      <div className="question-navigator">

        {questions.map((question, index) => (
          <button
            key={question.id}
            type="button"
            className={`nav-dot ${
              index === currentQuestionIndex
                ? "active"
                : ""
            } ${
              isAnswerSaved(question.id)
                ? "answered"
                : ""
            }`}
            onClick={async () => {
              const current =
                questions[currentQuestionIndex];

              await handleSaveAnswer(current.id);

              setCurrentQuestionIndex(index);
            }}
          />
        ))}

      </div>

    </div>
  );
};

export default TakeAssessment;
