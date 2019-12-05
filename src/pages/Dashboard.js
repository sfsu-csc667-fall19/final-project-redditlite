import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Container, Row, Col, DropdownButton, DropdownItem, Card, Button
} from 'react-bootstrap'

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

import {
  setnewNote, createNewNote, editNote, countView
} from '../redux/actions/notesActions'


const Dashboard = ({
  dispatch, email, username, notes, isLoggedIn, newNote
}) => {
  const accountLogOut = () => {
    dispatch(logoutUser())
  }

  const editNoteComp = entry => {
    let promptVal = window.prompt('How would you like to change the note?', '')

    if (promptVal === null) {
      // console.log('NO')
    } else if (promptVal === '') {
      let comfirmVal = window.confirm('Would you really like to delete the post content?')

      if (comfirmVal) {
        dispatch(editNote({
          note: {
            _id: entry._id,
            content: 'deleted...'
          }
        }))
      }
    } else {
      dispatch(editNote({
        note: {
          _id: entry._id,
          content: promptVal
        }
      }))
    }
  }

  const countViewComp = entry => {
    dispatch(countView(entry._id))
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div>
      {/* <NaviBar /> */}
      {/* <div>
        <h2>Dashboard</h2>
        <div>Welcome { username || email }</div>
        <button className="button" onClick={ () => accountLogOut() }>
          Log Out
        </button>
      </div>

      <div>
        <h2>Notes</h2>
        <div>
          <div>Create notes in the input below.</div>
          <div>To edit, please click on the card below.</div>
          <div>
            Cursor over count as reading and will increase the view count.
          </div>
        </div>

        <div>
          <input
            value={ newNote }
            placeholder="New Note"
            type="note"
            onChange={ e => dispatch(setnewNote(e.target.value)) }
            onKeyPress={
              e => e.key === 'Enter' ? dispatch(createNewNote()) : ''
            }
          />
          
          <button
            className="button"
            onClick={ () => dispatch(createNewNote()) }
          >
            Save
          </button>
          <hr />
        </div>
      </div> */}


      <div>
        <Container>
          {/* <Row>
            <Col sm={12}>
              <DropdownButton className="float-right" size="sm" title="Sort by" variant="secondary">
                <DropdownItem>Most Recent</DropdownItem>
                <DropdownItem>Top</DropdownItem>
                <DropdownItem>Controversial</DropdownItem>
              </DropdownButton>
            </Col>
          </Row>       */}
          <hr />
          {/* <Row >
              <Col>
                <Card>
                  <Card.Body className="text-left">
                    <Card.Title >
                      <h5>Title of the post</h5>
                    </Card.Title>
                    <Card.Text>
                      <p>submitted n hours ago by Username to Category</p>
                    </Card.Text>
                    <footer className="blockquote-footer">
                      30.8k comments
                    </footer>
                  </Card.Body>
                </Card>
              </Col>
            </Row> */}
            {
              notes.map((note, ind) => (
                <div key={ ind } >
                  <Row >
                    <Col>
                      <Card
                        onClick={ () => <Redirect to="/test/post/page" /> }
                      >
                        <Card.Body className="text-left" >
                          <Card.Title >
                            <h5>{ note.title }</h5>
                          </Card.Title>

                          <Card.Text>
                            <p>
                              submitted { note.timestamp } hours ago by { note.author.username }
                            </p>
                          </Card.Text>

                          <footer  className="blockquote-footer" >
                            { note.comments } comments
                          </footer>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row><br />
                </div>
              ))
            }
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  username: state.userReducer.username,
  notes: state.notesReducer.notes,
  newNote: state.notesReducer.newNote,
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(Dashboard);
