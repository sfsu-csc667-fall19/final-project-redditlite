import React from 'react';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const PostPage = ({ isLoggedIn }) => {

  return (
    <div>
      <h2>POST PAGE</h2>

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

export default connect(mapStatetoProps)(PostPage);
