import React from 'react';
import md5 from 'md5'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { setEmail, loginUser } from '../redux/actions/userActions'

const Login = ({ dispatch, email, isLoggedIn }) => {
  const [password, setPassword] = React.useState('');

  const verify = () => {
    if (!email.includes('@') || !email.includes('.')) {
      alert('Not a valid email!')
    } else if (password === '') {
      alert('Invalid email and password pairing!')
    } else {
      dispatch(loginUser({
        user: {
          email, password: md5(password)
        }
      }))
    }
  }

  const updateEmail = (newEmail) => {
    if (newEmail.length < 20) {
      dispatch(setEmail(newEmail))
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h2>Log In</h2>
      <div>
        <div className="App-header">
          <input
            value={ email }
            placeholder="EMAIL"
            type="text"
            onChange={ e => updateEmail(e.target.value) }
          />
          <input
            value={ password }
            placeholder="PASSWORD"
            type="password"
            onChange={ e => setPassword(e.target.value) }
            onKeyPress={ e => e.key === 'Enter' ? verify() : '' }
          />
        </div>
        <div>
          <button className="button" onClick={ () => verify() }>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);
