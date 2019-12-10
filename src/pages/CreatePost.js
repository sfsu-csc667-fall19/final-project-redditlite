import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const CreatePost = ({ isLoggedIn }) => {
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const verify = () => {
    if (!title) {
      alert('Title cannot be empty!')
    } else if (!description) {
      alert('Description cannot be empty!')
    } else {
      // TODO: update state with redux
    }
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h3>Create Post</h3>
      <input
        type="text" placeholder="Title of the post..."
        value={ title }
        onChange={ e => setTitle(e.target.value) }
      /><br />

      <textarea
        type="text"
        placeholder="Description of the post goes here..."
        value={ description }
        onChange={ e => setDescription(e.target.value) }
      >
      </textarea><br />

      <Button onClick={ () => verify() }>
        Submit
      </Button>
    </div>
  )
}

const mapStatetoProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStatetoProps)(CreatePost);
