import { useState } from "react";
import Search from "./components/Search";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUser = async (username) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error("User not found");

      const data = await res.json();
      setUser(data);

      // Fetch repos
      const repoRes = await fetch(data.repos_url);
      const repoData = await repoRes.json();
      setRepos(repoData);

    } catch (err) {
      setError(err.message);
      setUser(null);
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>GitHub User Finder</h1>

      <Search fetchUser={fetchUser} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && <UserCard user={user} />}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
}

export default App;
