import React from 'react';
import { Link } from 'react-router-dom';

const IntervieweeDashboard = () => {
    return (
        <section className="mx-auto w-full max-w-6xl">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My assessments</h1>
                <p className="mt-2 text-sm text-slate-500">Invitations, upcoming windows, and notifications from your recruiters.</p>
            </header>

            <div className="space-y-4">
                <AssessmentCard
                    title="Backend Engineer — Katas Round"
                    badge="READY TO START"
                    badgeClass="bg-emerald-100 text-emerald-700"
                    detail="Window: Today, 2:00–6:00 PM · Time limit 90 min · Invited by Jordan (Smart Recruiter)"
                    action="GO"
                    actionLabel="ACCEPT"
                    to="/interviewee/assessment/ia1/instructions"
                />
                <AssessmentCard
                    title="Junior Dev — Screening MCQ"
                    badge="GRADED"
                    badgeClass="bg-orange-100 text-orange-700"
                    detail="Completed Aug 10 · Feedback available from your mentor"
                    action="8.6"
                    actionLabel="YOUR SCORE"
                    to="/interviewee/results"
                />
                <AssessmentCard
                    title="Platform trial assessment"
                    badge="PRACTICE"
                    badgeClass="bg-amber-100 text-amber-800"
                    detail="No time limit · Get familiar with the whiteboard flow"
                    action="∞"
                    actionLabel="UNTIMED"
                    to="/interviewee/trial"
                />
            </div>
        </section>
    );
};

function AssessmentCard({ title, badge, badgeClass, detail, action, actionLabel, to }) {
    return (
        <Link to={to} className="group grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-emerald-300 hover:shadow-md md:grid-cols-[minmax(0,1fr)_180px]">
            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide ${badgeClass}`}>{badge}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500">{detail}</p>
            </div>
            <div className="flex min-h-28 flex-col items-center justify-center border-t border-dashed border-slate-200 bg-slate-50 px-5 py-5 text-center md:border-l md:border-t-0">
                <span className="text-3xl font-extrabold tracking-tight text-emerald-600 group-hover:text-emerald-700">{action}</span>
                <span className="mt-1 text-[10px] font-bold tracking-[0.16em] text-slate-500">{actionLabel}</span>
            </div>
        </Link>
    );
}

export default IntervieweeDashboard;
