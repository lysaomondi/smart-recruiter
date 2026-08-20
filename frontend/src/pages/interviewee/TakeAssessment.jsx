import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
    fetchAssessmentDetails,
    startAssessmentAttempt,
    submitAnswer,
    submitAssessment,
} from '../../store/slices/assessmentSlice';
import Timer from '../../components/common/Timer';
import Whiteboard from '../../components/interview/Whiteboard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';

const TakeAssessment = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentAssessment, currentAttempt, loading, error } = useSelector(
        (state) => state.assessment
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        const initAssessment = async () => {
            await dispatch(fetchAssessmentDetails(assessmentId));
            const result = await dispatch(startAssessmentAttempt(assessmentId));
            if (result.payload) {
                setTimerRunning(true);
            }
        };
        initAssessment();
    }, [dispatch, assessmentId]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleSaveAnswer = async (questionId, answer) => {
        try {
            await dispatch(submitAnswer({
                attemptId: currentAttempt.id,
                questionId,
                answerData: { answer },
            }));
        } catch (error) {
            console.error('Failed to save answer:', error);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < currentAssessment.questions.length - 1) {
            const currentQuestion = currentAssessment.questions[currentQuestionIndex];
            // Save current answer before moving
            if (answers[currentQuestion.id]) {
                handleSaveAnswer(currentQuestion.id, answers[currentQuestion.id]);
            }
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (window.confirm('Are you sure you want to submit the assessment?')) {
            setIsSubmitting(true);
            try {
                // Save any unsaved answers
                const currentQuestion = currentAssessment.questions[currentQuestionIndex];
                if (answers[currentQuestion.id]) {
                    await handleSaveAnswer(currentQuestion.id, answers[currentQuestion.id]);
                }
                await dispatch(submitAssessment(currentAttempt.id));
                navigate(`/interviewee/assessment/${assessmentId}/feedback`);
            } catch (error) {
                console.error('Failed to submit assessment:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleTimeUp = async () => {
        setTimerRunning(false);
        try {
            await dispatch(submitAssessment(currentAttempt.id));
            navigate(`/interviewee/assessment/${assessmentId}/feedback`);
        } catch (error) {
            console.error('Failed to auto-submit assessment:', error);
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!currentAssessment || !currentAttempt) return null;

    const currentQuestion = currentAssessment.questions[currentQuestionIndex];
    const totalQuestions = currentAssessment.questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    const renderQuestion = () => {
        switch (currentQuestion.type) {
            case 'multiple_choice':
                return (
                    <div className="multiple-choice-options">
                        {currentQuestion.options.map((option, index) => (
                            <label key={index} className="option-label">
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    value={option}
                                    checked={answers[currentQuestion.id] === option}
                                    onChange={() => handleAnswerChange(currentQuestion.id, option)}
                                />
                                <span>{option}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'subjective':
                return (
                    <div className="subjective-answer">
                        <textarea
                            rows="6"
                            placeholder="Type your answer here..."
                            value={answers[currentQuestion.id] || ''}
                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                        />
                    </div>
                );
            case 'coding':
                return (
                    <Whiteboard
                        question={currentQuestion}
                        answer={answers[currentQuestion.id]}
                        onAnswerChange={handleAnswerChange}
                    />
                );
            default:
                return null;
        }
    };

    const isAnswerSaved = (questionId) => {
        return currentAttempt.answers?.some((a) => a.questionId === questionId);
    };

    return (
        <div className="take-assessment-container">
            <div className="assessment-header">
                <h2>{currentAssessment.title}</h2>
                <Timer
                    initialTime={currentAttempt.timeRemaining || currentAssessment.duration * 60}
                    onTimeUp={handleTimeUp}
                    isRunning={timerRunning}
                />
                <Button
                    variant="danger"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                </Button>
            </div>

            <div className="assessment-progress">
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="progress-text">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
            </div>

            <div className="question-container">
                <div className="question-header">
                    <span className="question-type">{currentQuestion.type.replace('_', ' ').toUpperCase()}</span>
                    <span className="question-points">{currentQuestion.points} points</span>
                    {isAnswerSaved(currentQuestion.id) && (
                        <span className="answer-status">✅ Saved</span>
                    )}
                </div>

                <div className="question-content">
                    <p className="question-text">{currentQuestion.text}</p>
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
                        onClick={() => handleSaveAnswer(currentQuestion.id, answers[currentQuestion.id])}
                    >
                        Save Answer
                    </Button>
                    {currentQuestionIndex === totalQuestions - 1 ? (
                        <Button
                            variant="success"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </div>
            </div>

            <div className="question-navigator">
                {currentAssessment.questions.map((_, index) => (
                    <button
                        key={index}
                        className={`nav-dot ${index === currentQuestionIndex ? 'active' : ''} ${isAnswerSaved(currentAssessment.questions[index].id) ? 'answered' : ''
                            }`}
                        onClick={() => {
                            // Save current answer before switching
                            if (answers[currentQuestion.id]) {
                                handleSaveAnswer(currentQuestion.id, answers[currentQuestion.id]);
                            }
                            setCurrentQuestionIndex(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default TakeAssessment;