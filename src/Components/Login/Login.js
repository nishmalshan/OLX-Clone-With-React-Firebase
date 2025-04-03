import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../../olx-logo.png';
import { useHistory } from 'react-router-dom';
import './Login.css';

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {firebaseApp} = useContext(FirebaseContext)
  const auth = getAuth(firebaseApp)

  const handleLogin = async (e) => {
    e.preventDefault()
    const userSignIn = await signInWithEmailAndPassword(auth, email, password).then(() => {
      history.push('/')
    }).catch((error) => {
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue=""
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue=""
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => history.push('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
