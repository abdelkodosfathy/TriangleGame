import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle, logOut, fetchUsers } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";
import Game from "./Game/Game";

const App = () => {
  // const [user, setUser] = useState(null);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   const getUsers = async () => {
  //     const usersList = await fetchUsers();
  //     setUsers(usersList);
  //   };

  //   getUsers();
  // }, []);

  return (
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/login">Login</Link>
    //         </li>
    //         <li>
    //           <Link to="/register">Register</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route path="/profile" element={<Profile />} />
    //     </Routes>
    //   </div>
    //   {/* <h1>11</h1> */}
    //   {/* <Triangle/> */}
    //   {/* <div className="lamps-row">
    //     <Lamp color={"red"} />
    //     <Lamp color={"blue"} />
    //   </div> */}
    // </Router>

    // <div>
    //   {user ? (
    //     <div>
    //       <h2>Welcome, {user.displayName}</h2>
    //       <button onClick={logOut}>Log Out</button>
    //     </div>
    //   ) : (
    //     <button onClick={signInWithGoogle}>Sign In with Google</button>
    //   )}
    //   <h3>Logged In Users:</h3>
    //   <ul>
    //     {users.map((user, index) => (
    //       <li key={index}>
    //         <img src={user.photoURL} alt={user.displayName} width={30} height={30} />
    //         {user.displayName} ({user.email})
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <>
      <Game level={7} />
    </>
  );
};

export default App;
