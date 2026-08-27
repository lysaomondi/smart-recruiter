const IntervieweeDashboard = () => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          My assessments
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Invitations, upcoming windows, and notifications from your recruiters.
        </p>
      </header>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
        Invitations are unavailable because the backend does not currently
        expose invitation endpoints.
      </div>
    </section>
  );
};

export default IntervieweeDashboard;
