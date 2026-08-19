import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAssessmentDetails } from '../../store/slices/assessmentSlice';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';

const AssessmentInstructions = () => {
    const { assessmentId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentAssessment, loading, error } = useSelector((state) => state.assessment);
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
        dispatch(fetchAssessmentDetails(assessmentId));
    }, [dispatch, assessmentId]);

    const handleStartAssessment = () => {
        if (agreed) {
            navigate(`/interviewee/assessment/${assessmentId}/take`);
        }
    };

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;
    if (!currentAssessment) return null;

    return (
        <div className="assessment-instructions">
            <div className="instructions-header">
                <h1>{currentAssessment.title}</h1>
                <div className="instructions-meta">
                    <span>⏱️ {currentAssessment.duration} minutes</span>
                    <span>📝 {currentAssessment.questions?.length || 0} questions</span>
                    <span>🏆 {currentAssessment.totalPoints || 0} points</span>
                </div>
            </div>

            <div className="instructions-content">
                <h2>Instructions</h2>
                <ul>
                    <li>You have <strong>{currentAssessment.duration} minutes</strong> to complete this assessment</li>
                    <li>The timer will start as soon as you click "Start Assessment"</li>
                    <li>You cannot pause the timer once started</li>
                    <li>Your answers will be automatically submitted when time runs out</li>
                    <li>Ensure you have a stable internet connection</li>
                </ul>

                <h3>Question Types</h3>
                <ul>
                    <li><strong>Multiple Choice:</strong> Select the correct answer</li>
                    <li><strong>Subjective:</strong> Write a detailed response</li>
                    <li><strong>Coding:</strong> Write BDD, pseudocode, and code solution</li>
                </ul>

                <h3>Technical Requirements</h3>
                <ul>
                    {currentAssessment.technologies?.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>

                <div className="instructions-agreement">
                    <label>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        I have read and understand the instructions
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