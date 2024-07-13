// src/UserList.jsx
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, 'users');

    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const userList = Object.keys(usersData).map(userId => ({
          id: userId,
          ...usersData[userId]
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });

    // Cleanup function to unsubscribe from Firebase listeners
    return () => {
      // Unsubscribe from Firebase listeners (if needed)
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="UserList">
      <h2>List of Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.displayName}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
