function SkillBreakdown({ skills = [] }) {
  return (
    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Skill Breakdown
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Performance across the assessed technical skills.
        </p>
      </div>

      <div className="space-y-6">
        {skills.length === 0 ? (
          <p className="text-sm text-gray-500">
            No skill data available.
          </p>
        ) : (
          skills.map((skill) => {
            const score = Math.min(
              Math.max(skill.score ?? 0, 0),
              100
            );

            return (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {skill.name}
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    {score}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default SkillBreakdown;