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
    <div class="forms">
      <h1 className="logo">redditlite</h1>
      <h2>Log In</h2>
      <div>
        <div className="App-header">
          <input 
            value={email}
            placeholder="Email"
            type="text"
            onChange={e => updateEmail(e.target.value)}
          />
          <input
            value={password}
            placeholder="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => (e.key === 'Enter' ? verify() : '')}
          />
        </div>
        <div>
          <button class="button btn-lg" onClick={() => verify()}>
           <span>Log In</span> 
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
