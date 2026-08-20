import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Whiteboard = ({ question, answer, onAnswerChange, isReadOnly = false }) => {
    const [activeTab, setActiveTab] = useState('bdd');
    const [bdd, setBdd] = useState('');
    const [pseudocode, setPseudocode] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        if (answer) {
            setBdd(answer.bdd || '');
            setPseudocode(answer.pseudocode || '');
            setCode(answer.code || '');
        }
    }, [answer]);

    const handleContentChange = (type, value) => {
        const updatedAnswer = { bdd, pseudocode, code, [type]: value };
        if (type === 'bdd') setBdd(value);
        if (type === 'pseudocode') setPseudocode(value);
        if (type === 'code') setCode(value);

        if (onAnswerChange) {
            onAnswerChange(question?.id, updatedAnswer);
        }
    };

    const tabs = [
        { id: 'bdd', label: 'BDD' },
        { id: 'pseudocode', label: 'Pseudocode' },
        { id: 'code', label: 'Code' },
    ];

    return (
        <div className="whiteboard-container">
            <div className="whiteboard-header">
                <h4>Whiteboard Solution</h4>
                {!isReadOnly && (
                    <p className="whiteboard-instructions">
                        Write your BDD, pseudocode, and code solution below
                    </p>
                )}
            </div>

            <div className="whiteboard-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        disabled={isReadOnly}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="whiteboard-content">
                {activeTab === 'bdd' && (
                    <div className="whiteboard-section">
                        <label>Behavior Driven Development (BDD)</label>
                        <textarea
                            value={bdd}
                            onChange={(e) => handleContentChange('bdd', e.target.value)}
                            placeholder="Given ...\nWhen ...\nThen ..."
                            rows="6"
                            readOnly={isReadOnly}
                            className={isReadOnly ? 'readonly' : ''}
                        />
                        <div className="bdd-example">
                            <p><strong>Example:</strong></p>
                            <code>
                                Given a user inputs a valid email address<br />
                                When they click "Submit"<br />
                                Then the system should send a confirmation email
                            </code>
                        </div>
                    </div>
                )}

                {activeTab === 'pseudocode' && (
                    <div className="whiteboard-section">
                        <label>Pseudocode</label>
                        <textarea
                            value={pseudocode}
                            onChange={(e) => handleContentChange('pseudocode', e.target.value)}
                            placeholder="Write your algorithm in plain English..."
                            rows="8"
                            readOnly={isReadOnly}
                            className={isReadOnly ? 'readonly' : ''}
                        />
                    </div>
                )}

                {activeTab === 'code' && (
                    <div className="whiteboard-section">
                        <label>Code Solution</label>
                        <textarea
                            value={code}
                            onChange={(e) => handleContentChange('code', e.target.value)}
                            placeholder="Write your code solution here..."
                            rows="10"
                            className={`code-editor ${isReadOnly ? 'readonly' : ''}`}
                            readOnly={isReadOnly}
                        />
                        {!isReadOnly && (
                            <div className="code-hint">
                                <p>💡 Hint: Focus on clean, readable code with proper naming conventions</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

Whiteboard.propTypes = {
    question: PropTypes.object,
    answer: PropTypes.object,
    onAnswerChange: PropTypes.func,
    isReadOnly: PropTypes.bool,
};

Whiteboard.defaultProps = {
    onAnswerChange: () => { },
    isReadOnly: false,
};

export default Whiteboard;