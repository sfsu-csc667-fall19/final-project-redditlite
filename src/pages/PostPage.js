import React from 'react';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Container, Row, Col, DropdownButton, DropdownItem, Card, Button } from 'react-bootstrap';

const PostPage = ({ isLoggedIn }) => {
  const [mockData, setMockData, post] = React.useState([])

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
          <h3>oisefoeiufpnes</h3>
          <dir className="Post-signature">
            By kejhf
          </dir>
          <p>
            paifjepsirugjpaiuf
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
          post && post.map((post, ind) => (
            <dir className="Comment-card" key={ ind }>
              <dir className="Post-signature">
                By {post.comments.author}
              </dir>
              <p>
                {post.comments.text}
              </p>

              {/* Comments of comment */}
              {
                post.comments.comments && post.comments.comments.map((post,ind) =>(
                  <dir className="Comment-card" key={ ind }>
                    <dir className="Post-signature">
                      By {post.comments.comments.author}
                    </dir>
                    <p>
                      {post.comments.comments.text}
                    </p>
                  </dir>
                ))
              }

            </dir>
          ))
        }
      </Container>
    </div>
  );
};

const mapStatetoProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  post: state.notesReducer.post
})

export default connect(mapStatetoProps)(PostPage);
