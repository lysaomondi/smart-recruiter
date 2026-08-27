import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStatistics } from "../../store/slices/resultSlice";

export default function Statistics() {
  const dispatch = useDispatch();
  const { statistics, loading, error } = useSelector((state) => state.results);
  useEffect(() => {
    dispatch(loadStatistics());
  }, [dispatch]);

  return (
    <section className="mx-auto w-full max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Results statistics
        </h1>
        <p className="mt-2 text-sm text-muted-2">
          Aggregate statistics returned by the backend.
        </p>
      </header>
      {loading && <Message text="Loading statistics..." />}
      {error && <Message text={`Unable to load statistics: ${error}`} />}
      {!loading && !error && !statistics && (
        <Message text="No statistics are available." />
      )}
      {statistics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total results" value={statistics.total_results} />
          <Stat
            label="Average percentage"
            value={statistics.average_percentage}
          />
          <Stat
            label="Highest percentage"
            value={statistics.highest_percentage}
          />
          <Stat
            label="Lowest percentage"
            value={statistics.lowest_percentage}
          />
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <article className="rounded-xl border border-paper-line bg-white p-5 shadow-sm">
      <p className="text-sm text-muted-2">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-ink">{value}</p>
    </article>
  );
}
function Message({ text }) {
  return <p className="text-center text-sm text-muted-2">{text}</p>;
}
