import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    // Add logic for handling registration here
    console.log('Registering with', { username, password, email });

    try{
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, "Users", user.uid), {
          email: email,
          name: username,
        });
      }
      console.log("reg successful");
    } catch (r){
      console.log(r);
    }
    
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username: </label>
          <input onChange={e => setUsername(e.target.value)} type="text" name="username" />
        </div>
        <div>
          <label>Password: </label>
          <input onChange={e => setPassword(e.target.value)} type="password" name="password" />
        </div>
        <div>
          <label>Email: </label>
          <input onChange={e => setEmail(e.target.value)} type="email" name="email" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

//الفيديو اللي محتاج اتفرج عليه
//Firebase Auth with React Step-by-Step Tutorial || Login Register auth with firebase React Firestore
 
