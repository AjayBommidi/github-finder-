function RepoList({ repos }) {
  return (
    <div>
      <h3>Repositories</h3>
      {repos.slice(0, 5).map((repo) => (
        <div key={repo.id}>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
        </div>
      ))}
    </div>
  );
}

export default RepoList;