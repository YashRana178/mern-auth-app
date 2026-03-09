import { useEffect, useState } from "react";
import axios from "axios";


export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/profile",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  if (!user) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <h2>Email: {user.email}</h2>
      <h2>Age: {user.age}</h2>
      <button onClick={() => (window.location.href = "/home")}>Home Page</button>
    </div>
  );
}
