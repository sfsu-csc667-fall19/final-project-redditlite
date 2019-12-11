import React from 'react'
import md5 from 'md5'

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setEmail, setUsername, registerUser
} from '../redux/actions/userActions'

const Login = ({ dispatch, email, username, isLoggedIn }) => {
  const [password, setPassword] = React.useState('')
  const [confPassword, setConfPassword] = React.useState('')

  const verify = () => {
    if (!email.includes('@') || !email.includes('.')) {
      alert('Not a valid email!')
    } else if (username === '') {
      alert('Username cannot be empty!')
    } else if (password !== confPassword) {
      alert('Passwords do not match!')
    } else if (password.length < 5) {
      alert('Password must be longer than 5 characters!')
    } else {
      dispatch(registerUser({
        user: {
          username, email, password: md5(password)
        }
      }))
    }
  }

  const updateEmail = (newEmail) => {
    if (newEmail.length < 20) {
      dispatch(setEmail(newEmail))
    }
  }

  const updateUsername = (newUsername) => {
    if (newUsername.length < 20) {
      dispatch(setUsername(newUsername))
    }
  }

  const updatePassword = newPassword => {
    if (newPassword.length < 20) {
      setPassword(newPassword)
    }
  }

  const updateConfPassword = newConfPassword => {
    if (newConfPassword.length < 20) {
      setConfPassword(newConfPassword)
    }
  }

  if (isLoggedIn) {
    // return <Redirect to="/dashboard" />;
  }

  return (
    <div className="forms">
      <h1 className="logo">redditlite</h1>
      <h2>Sign Up</h2>
      <div>
        <div className="App-header">
          <input
            value={email}
            placeholder="Email"
            type="text"
            onChange={e => updateEmail(e.target.value)}
          />
          <input
            value={username}
            placeholder="Username"
            type="text"
            onChange={e => updateUsername(e.target.value)}
          />
          <input
            value={password}
            placeholder="New Password"
            type="password"
            onChange={e => updatePassword(e.target.value)}
          />
          <input
            value={confPassword}
            placeholder="Confirm Password"
            type="password"
            onChange={e => updateConfPassword(e.target.value)}
            onKeyPress={e => (e.key === 'Enter' ? verify() : '')}
          />
        </div>

        <div>
          <button class="button btn-lg" onClick={() => verify()}>
            <span>Register</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  username: state.userReducer.username,
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(Login);
