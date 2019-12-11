import React from 'react'
import './App.css'

import { Switch, Route, Link, Redirect } from "react-router-dom"
import { connect } from 'react-redux'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import PostPage from './pages/PostPage'
import CreatePost from './pages/CreatePost'

import { loginUser } from './redux/actions/userActions'
import NaviBar from './pages/NaviBar'

const App = ({ dispatch, isLoggedIn }) => {

  React.useEffect(() => {
    let email = null
    let password = null

    document.cookie.split(';').forEach(piece => {
      if (piece.includes('email=')) {
        email = piece.split('=')[1]
      } else if (piece.includes('password=')) {
        password = piece.split('=')[1]
      }
    })

    if (email) {
      dispatch(loginUser({
        user: {
          email, password
        }
      }))
    }
  }, []); // VERY IMPORTANT NEEDS THE EMPTY ARRAY

  return (
    <div className="App">
      {/* {
        isLoggedIn && (
          <Redirect to="/dashboard" />
        )
      } */}
      <div className="nav-bar">
        {
          isLoggedIn && (
            <div>
              <NaviBar />
            </div>
          )
        }
      </div>
      <Switch>
        {/* <Route path="/test/post/page" component={ PostPage } /> */}
        <Route path="/signup" component={ Signup } />
        <Route path="/dashboard" component={ Dashboard } />
        <Route path="/post/create" component={ CreatePost } />
        <Route path="/post/:id" component={ PostPage } />
        {/* <Route path="/login" component={ Login } /> */}
        <Route path="/" component={ Login } />
      </Switch>

      {/* <div className="App-header">
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={validate}>Submit</button>
        <button onClick={fetchProtectedData}>Get Data</button>
      </div> */}
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);
