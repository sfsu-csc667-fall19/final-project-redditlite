// import axios from 'axios'

export const resetApp = () => (dispatch, getState) => {
  dispatch(listNotes())
}

export const loadPostContent = id => (dispatch, getState) => {
  let post = {}
  // db code goes here
}

const reducePostComments = post => ({
  type: 'POST_COMMENTS',
  post
})

export const createNewPost = (
  title, description, username
) => (dispatch, getState) => {
  dispatch(reduceLoading(true))
  // db code goes here
}

const reduceCreateNewPost = post => ({
  type: 'CREATE_NEW_POST',
  post
})

const reduceLoading = loading => ({
  type: 'LOADING',
  loading
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

export const listNotes = () => (dispatch, getState) => {
  dispatch(reduceLoading(true))
  // db code goes here
  // axios.get('/api/notes/all', { withCredentials: true })
  //   .then(res => {
  //     dispatch(setNotes(res.data.response.notes))
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
}

const setNotes = notes => ({
  type: 'NOTES_SET_NOTES',
  notes
})
