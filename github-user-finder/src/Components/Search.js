import { useState } from "react";
let timer;
function Search({ fetchUser }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return;
    fetchUser(username);
  };
  //let timer;

const handleChange = (e) => {
  clearTimeout(timer);
  const value = e.target.value;

  timer = setTimeout(() => {
    setUsername(value);
    fetchUser(value);
  }, 500);
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;




// let timer;

// const handleChange = (e) => {
//   clearTimeout(timer);
//   const value = e.target.value;

//   timer = setTimeout(() => {
//     setUsername(value);
//     fetchUser(value);
//   }, 500);
// };