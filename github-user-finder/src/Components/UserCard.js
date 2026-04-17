function UserCard({ user }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", margin: "20px" }}>
      <img src={user.avatar_url} alt="avatar" width="100" />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>

      <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p>
    </div>
  );
}

export default UserCard;