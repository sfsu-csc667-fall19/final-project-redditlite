import axios from 'axios'

export const resetApp = () => (dispatch, getState) => {
  // last step
  // dispatch(listNotes())
}

export const loadPostContent = id => (dispatch, getState) => {
  let post = {}
  // db code goes here
  // axios.get('/api/notes/all', { withCredentials: true })
  //   .then(res => {
  //     dispatch(setNotes(res.data.response.notes))
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
}

const reducePostComments = post => ({
  type: 'POST_COMMENTS',
  post
})

export const createNewPost = (
  title, description, username
) => (dispatch, getState) => {
  dispatch(reduceLoading(true))
  let body = {
    post: { title, text: description }
  }

  axios.post('/api/post/new', body, { withCredentials: true })
    .then(res => {
      dispatch(reduceCreateNewPost(res.data.response.post))
      dispatch(reduceLoading(false))
      return
    })
    .catch(err => {
      console.log(err)
    })
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

  axios.get('/api/post/sorted', { withCredentials: true })
    .then(res => {
      dispatch(setNotes(res.data.response))
      dispatch(reduceLoading(false))
      return
    })
    .catch(err => {
      console.log(err)
    })
}

const setNotes = notes => ({
  type: 'NOTES_SET_NOTES',
  notes
})
