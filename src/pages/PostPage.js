import React from 'react';

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Container, Row, Col, DropdownButton, DropdownItem, Card, Button, Modal, InputGroup, FormControl } from 'react-bootstrap';

import { addFirstComment, addSecondComment } from '../redux/actions/notesActions'



const PostPage = ({ isLoggedIn, post }) => {
  const [firstReply, setFirstReply] = React.useState('')
  const [secondReply, setSecondReply] = React.useState('')

  // React.useEffect(() => {
  //   setMockData(['a', 'b', 'c'])
  // }, [])

  const [show, setShow] = React.useState(false);


  const handleFirstComment = firstReply => {
    addFirstComment(firstReply)
    setShow(false)
  }

  const handleSecondComment = (secondComment, fCindex) => {
    addSecondComment(secondComment, fCindex)
    setShow(false)
  }

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
              <Button variant="secondary" size="small" onClick={ () => setShow(true)}>
                Reply
              </Button>

              <Modal show={ show } onHide={ () => setShow(false) } centered>
                <Modal.Header closeButton>
                  <Modal.Title>Your Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <InputGroup>
                    <FormControl
                      placeholder = "Your words here"
                      as = "textarea"
                      onChange={ e => setFirstReply(e.target.value) }
                    />
                    <InputGroup.Append>
                      <Button variant="secondary" onClick={ () => handleFirstComment(firstReply) }>Post</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  
                </Modal.Body>
              </Modal>
            </div>
         
          
        </div>

        {
          (post && post.comments) && post.comments.map((firstComment, fCindex) => (
            <dir className="Comment-card" key={ fCindex }>
              { firstComment.text } <br />
              <dir className="Post-signature">
                By { firstComment.author } at { firstComment._createdAt }
                <Button variant="secondary" size="small" onClick={ () => setShow(true) }>
                      Reply
                    </Button>

                    <Modal show={show} onHide={ () => setShow(false) } centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Your Comment</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <InputGroup>
                          <FormControl
                            placeholder = "Your words here"
                            as = "textarea"
                            style={{ "min-height": "30vh" }}
                            onChange={ e => setSecondReply(e.target.value) }
                          />
                        </InputGroup>
                        <Modal.Footer>
                          <Button
                            style={{ "align": "right" }}
                            variant="secondary" type="sm"
                            onClick={ () => handleSecondComment(secondReply, fCindex) }
                          >
                            Comment
                          </Button>
                        </Modal.Footer>
                        
                        
                      </Modal.Body>                    
                    </Modal>

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
