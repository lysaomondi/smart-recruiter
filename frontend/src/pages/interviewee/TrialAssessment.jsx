import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Timer from '../../components/common/Timer';
import Whiteboard from '../../components/interview/Whiteboard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';
import { fetchTrialAssessment, submitTrialAssessment } from '../../store/slices/assessmentSlice';

const TrialAssessment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { trialAssessment, loading, error } = useSelector((state) => state.assessment);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        dispatch(fetchTrialAssessment());
        setTimerRunning(true);
    }, [dispatch]);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < trialAssessment.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (window.confirm('Submit your trial assessment?')) {
            setIsSubmitting(true);
            try {
                await dispatch(submitTrialAssessment({ answers }));
                navigate('/interviewee/dashboard');
            } catch (error) {
                console.error('Failed to submit trial:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleTimeUp = () => {
        setTimerRunning(false);
        handleSubmit();
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!trialAssessment) return null;

    const currentQuestion = trialAssessment.questions[currentQuestionIndex];
    const totalQuestions = trialAssessment.questions.length;
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

    return (
        <div className="trial-assessment-container">
            <div className="trial-header">
                <h1>🔬 Trial Assessment</h1>
                <p className="trial-notice">
                    This is a practice assessment. Your answers will not be graded.
                </p>
                <Timer
                    initialTime={trialAssessment.duration * 60}
                    onTimeUp={handleTimeUp}
                    isRunning={timerRunning}
                />
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
                    <span className="question-type">{currentQuestion.type}</span>
                    <span className="question-points">{currentQuestion.points} points</span>
                </div>

                <div className="question-content">
                    <p className="question-text">{currentQuestion.text}</p>

                    {currentQuestion.type === 'multiple_choice' && (
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
                    )}

                    {currentQuestion.type === 'subjective' && (
                        <div className="subjective-answer">
                            <textarea
                                rows="6"
                                placeholder="Type your answer here..."
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                            />
                        </div>
                    )}

                    {currentQuestion.type === 'coding' && (
                        <Whiteboard
                            question={currentQuestion}
                            answer={answers[currentQuestion.id]}
                            onAnswerChange={handleAnswerChange}
                        />
                    )}
                </div>

                <div className="question-actions">
                    <Button
                        variant="secondary"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                    >
                        Previous
                    </Button>
                    {currentQuestionIndex === totalQuestions - 1 ? (
                        <Button
                            variant="success"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Trial'}
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrialAssessment;