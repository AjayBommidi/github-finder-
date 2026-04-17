import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Debounce Logic: Wait 500ms after user stops typing before fetching
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        fetchGitHubData(query);
      } else {
        setUser(null);
        setRepos([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const fetchGitHubData = async (username) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Profile
      const userRes = await axios.get(`https://api.github.com/users/${username}`);
      setUser(userRes.data);

       // 2. Fetch Repos (Bonus)
      const repoRes = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
      setRepos(repoRes.data);
    } catch (err) {
      setUser(null);
      setError('User not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App"><h1>GitHub User Finder</h1>
      <input
        type="text"
        placeholder="Enter username..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <div className="spinner">Loading...</div>}
      
      {error && <p className="error">{error}</p>} {user && !loading && (
        <div className="profile-card">
          <img src={user.avatar_url} alt={user.name} width="150" />
          <h2>{user.name || user.login}</h2>
          <p>{user.bio}</p>
          <div className="stats">
            <span>Followers: {user.followers}</span> | <span>Following: {user.following}</span>
          </div>

          <h3>Latest Repositories:</h3>
          <ul>
            {repos.map(repo => (<li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">{repo.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

