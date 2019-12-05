import React from 'react';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Container, Row, Col, DropdownButton, DropdownItem, Card, Button } from 'react-bootstrap';

const PostPage = ({ isLoggedIn }) => {
  const [mockData, setMockData] = React.useState([])

  React.useEffect(() => {
    setMockData(['a', 'b', 'c'])
  }, [])

  return (
    <div>
      <Container>
        {/* <h2>POST PAGE</h2> */}

        {/* <button
          onClick={ () => testData() }
        >
          Test
        </button> */}

        {/* {
          !isLoggedIn && (
            <div>
              Hello
            </div>
          )
        } */}

        <div className="Post-card">
          <h3>This is the Title of the Test Post</h3>
          <dir className="Post-signature">
            By Admin
          </dir>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="Post-toolbar">
            <i className="material-icons md-14">forum</i>
            <b className="p-right">3 Comments</b>
            <i className="material-icons md-14">share</i>
            <b className="p-right">Share</b>
            <i className="material-icons md-14">save</i>
            <b className="p-right">Save</b>
          </div>
        </div>

        {
          mockData && mockData.map((data, ind) => (
            <dir className="Comment-card" key={ ind }>
              <dir className="Post-signature">
                By Admin
              </dir>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </dir>
          ))
        }
      </Container>
    </div>
  );
};

const mapStatetoProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStatetoProps)(PostPage);
