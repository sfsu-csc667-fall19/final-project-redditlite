import axios from 'axios';

// TODO: look up to db to get all the associated data
export const setPostId = _id => ({
  type: 'SET_POST_ID',
  postId: _id
})

export const createNewPost = (title, description, username) => ({
  type: 'CREATE_NEW_POST',
  post: {
    _id: 'some_id',
    title: title,
    text: description,
    author: username,
    num_comments: 0,
    _createdAt: Date(Date.now())
  }
})

export const addFirstComment = (comment, username) => ({
  type: 'ADD_FIRST_LAYER_COMMENT',
  comment: {
    text: comment,
    author: username,
    parent: null,
    comments: [],
    _createdAt: Date(Date.now())
  }
})

export const addSecondComment = (comment, index, username) => ({
  type: 'ADD_SECOND_LAYER_COMMENT',
  comment: {
    text: comment,
    author: username,
    parent: null,
    comments: [],
    _createdAt: Date(Date.now())
  },
  index
})

const setNotes = notes => ({
  type: 'NOTES_SET_NOTES',
  notes
})

export const listNotes = () => (dispatch, getState) => {
  axios.get('/api/notes/all', { withCredentials: true })
    .then(res => {
      dispatch(setNotes(res.data.response.notes))
      dispatch(setnewNote(''))
    })
    .catch(err => {
      console.log(err)
    })
};

export const setnewNote = newNote => ({
  type: 'NOTES_SET_NEW_NOTE',
  newNote
})

export const createNewNote = () => (dispatch, getState) => {
  let { newNote } = getState().notesReducer

  axios.post('/api/notes/new', {
    note: {
      content: newNote
    }
  }, { withCredentials: true })
    .then(res => dispatch(listNotes()))
    .catch(err => {
      console.log(err)
    })
}

export const editNote = note => (dispatch, getState) => {
  axios.post('/api/notes/edit', note, { withCredentials: true })
    .then(res => dispatch(listNotes()))
    .catch(err => {
      console.log(err)
    })
}

export const countView = _id => (dispatch, getState) => {
  axios.get(`/api/notes/note/${_id}`, { withCredentials: true })
    .then(res => {
    })
    .catch(err => {
      console.log(err)
    })
}
