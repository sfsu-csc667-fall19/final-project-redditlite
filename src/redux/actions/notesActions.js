import axios from 'axios';

export const addFirstComment = comment => ({
  type: 'ADD_FIRST_LAYER_COMMENT',
  comment
})

export const addSecondComment = (comment, index) => ({
  type: 'ADD_SECOND_LAYER_COMMENT',
  comment, index
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
