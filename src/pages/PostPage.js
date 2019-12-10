import React from 'react';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Container, Row, Col, DropdownButton, DropdownItem, Card, Button } from 'react-bootstrap';

const PostPage = ({ isLoggedIn, post }) => {
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
              <Button type="button" class="btn btn-block">
                Reply
              </Button>
            </div>
         
          
        </div>

        {
          (post && post.comments) && post.comments.map((firstComment, fCindex) => (
            <dir className="Comment-card" key={ fCindex }>
              { firstComment.text } <br />
              <dir className="Post-signature">
                By { firstComment.author } at { firstComment._createdAt }
              </dir>
              
              {
                firstComment.comments && firstComment.comments.map((secondComment, sCindex) => (
                  <dir className="Comment-card" key={ sCindex }>
                    { secondComment.text } <br />
                    <dir className="Post-signature">
                      By { secondComment.author } at { secondComment._createdAt }
                    </dir>
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
