import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NaviBar from './NaviBar';

const Home = ({isLoggedIn}) => {

  return (
    <div>
      
      <h2>Home</h2>
      <h3>Welcome to Note-Taking App</h3>

      {
        !isLoggedIn && (
          <div>
            Please either 'Log In' or 'Sign Up' to continue...
            <br /><Link to="/login">Login</Link>
            <br /><Link to="/signup">Sign Up</Link>
          </div>
        )
      }
      {
        isLoggedIn && (
          <div>
            Enjoy our wonky WebApp...
          </div>
        )
      }
    </div>
  );
};

const mapStatetoProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStatetoProps)(Home);
