import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";


function UserPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT USER
  const editUser = async (user) => {

    const newName = prompt("Enter new name", user.name);
    const newEmail = prompt("Enter new email", user.email);
    const newAge = prompt("Enter new age", user.age);

    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, {
        name: newName,
        email: newEmail,
        age: newAge
      });

      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="user-page">

      <h1 div className="text-box">User List</h1>

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editUser(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}
                  
          </tbody>

        </table>

      </div>

    </div>
     
     <button className="home-btn"onClick={() => navigate("/home")}> 
        Home
      </button>
     
      </>


  );
}

export default UserPage;