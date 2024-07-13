import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      // Add logic for handling login here
      console.log('Logging in with', { email, password });
      try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href ="/profile";
        console.log("logen in successfuly");
      } catch (e) {
        console.log(e);
      }
    };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>email: </label>
          <input onChange={e => setEmail(e.target.value)} type="text" name="email" />
        </div>
        <div>
          <label>Password: </label>
          <input onChange={e => setPassword(e.target.value)} type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
