import { useEffect, useState } from "react";
import {
  getUser,
  getCompletedChallenges,
} from "../api/codewars";

function Codewars() {
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username = "69d4fb3d55b08a66bdc74c76";

  useEffect(() => {
    const loadCodewarsData = async () => {
      try {
        setLoading(true);
        setError("");

        const userData = await getUser(username);

        setUser(userData);

        const completedData = await getCompletedChallenges(
          userData.id
        );

        setChallenges(completedData.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Codewars data.");
      } finally {
        setLoading(false);
      }
    };

    loadCodewarsData();
  }, []);

  if (loading) {
    return <p>Loading Codewars data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Codewars Results</h1>

      {user && (
        <section>
          <h2>{user.username}</h2>

          <p>Honor: {user.honor}</p>

          <p>
            Overall Rank: {user.ranks.overall.name}
          </p>

          <p>
            Overall Score: {user.ranks.overall.score}
          </p>

          <p>
            Completed Challenges:{" "}
            {user.codeChallenges.totalCompleted}
          </p>

          <p>
            Authored Challenges:{" "}
            {user.codeChallenges.totalAuthored}
          </p>
        </section>
      )}

      <section>
        <h2>Completed Challenges</h2>

        {challenges.length === 0 ? (
          <p>No completed challenges.</p>
        ) : (
          <ul>
            {challenges.map((challenge) => (
              <li key={challenge.id}>
                <strong>{challenge.name}</strong>
                <br />

                Language:{" "}
                {challenge.completedLanguages.join(", ")}

                <br />

                Completed:{" "}
                {new Date(
                  challenge.completedAt
                ).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Codewars;