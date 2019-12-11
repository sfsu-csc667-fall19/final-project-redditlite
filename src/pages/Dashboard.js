import React from "react"

import { Container, Row, Col, Card } from "react-bootstrap"

import { Redirect, useHistory } from "react-router-dom"
import { connect } from "react-redux"

import { setPostId } from "../redux/actions/notesActions"

const Dashboard = ({ dispatch, notes, isLoggedIn }) => {
  let history = useHistory()

  const renderPost = note => {
    dispatch(setPostId(note._id))
    history.push(`/post/${note._id}`)
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <div>
        <br />
        <Container>
          { notes.slice(0).reverse().map((note, ind) => (
            <div key={ ind }>
              <Row>
                <Col>
                  <Card onClick={() => renderPost(note) }>
                    <Card.Body className="text-left">
                      <Card.Title>
                        <h5>{ note.title }</h5>
                      </Card.Title>

                      <Card.Text>
                        submitted { note.timestamp } hours ago by{' '}
                        { note.author.username }
                      </Card.Text>

                      <footer className="blockquote-footer">
                        { note.comments } comments
                      </footer>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <br />
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  notes: state.notesReducer.notes,
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(Dashboard)
