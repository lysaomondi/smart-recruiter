import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { loadAssessmentById } from "../../store/slices/assessmentSlice";

import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";
import ErrorMessage from "../../components/common/ErrorMessage";

const AssessmentInstructions = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    active: assessment,
    status,
    error,
  } = useSelector((state) => state.assessment);

  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!assessmentId) {
      return;
    }

    dispatch(loadAssessmentById(assessmentId));
  }, [dispatch, assessmentId]);

  const handleStartAssessment = () => {
    if (!agreed || !assessmentId) {
      return;
    }

    navigate(`/interviewee/assessment/${assessmentId}/take`);
  };

  if (!assessmentId) {
    return (
      <ErrorMessage message="No assessment ID was provided." />
    );
  }

  if (status === "loading") {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!assessment) {
    return null;
  }

  const questions = assessment.questions || [];

  return (
    <div className="assessment-instructions">
      <div className="instructions-header">
        <h1>{assessment.title}</h1>

        <div className="instructions-meta">
          <span>
            {assessment.timeLimitMinutes || 0} minutes
          </span>

          <span>
            {questions.length} questions
          </span>

          <span>
            {questions.length} points
          </span>
        </div>
      </div>

      <div className="instructions-content">
        <h2>Instructions</h2>

        <ul>
          <li>
            You have{" "}
            <strong>
              {assessment.timeLimitMinutes || 0} minutes
            </strong>{" "}
            to complete this assessment.
          </li>

          <li>
            The timer will start when you begin the assessment.
          </li>

          <li>
            You cannot pause the timer once the assessment
            has started.
          </li>

          <li>
            Save your answers as you progress.
          </li>

          <li>
            Your answers will be automatically submitted when
            the time runs out.
          </li>

          <li>
            Ensure you have a stable internet connection.
          </li>
        </ul>

        <h3>Question Types</h3>

        <ul>
          <li>
            <strong>Multiple Choice:</strong>{" "}
            Select the correct answer.
          </li>

          <li>
            <strong>Free Text:</strong>{" "}
            Write a detailed response.
          </li>

          <li>
            <strong>Coding Kata:</strong>{" "}
            Complete the coding challenge.
          </li>
        </ul>

        <div className="instructions-agreement">
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) =>
                setAgreed(event.target.checked)
              }
            />

            {" "}
            I have read and understand the instructions.
          </label>
        </div>

        <div className="instructions-actions">
          <Button
            variant="primary"
            onClick={handleStartAssessment}
            disabled={!agreed}
            size="large"
          >
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentInstructions;
