import axios from 'axios'

import { listNotes } from './notesActions'

export const setEmail = email => ({
  type: 'SET_EMAIL',
  email
})

export const setIsLoggedIn = isLoggedIn => ({
  type: 'SET_IS_LOGGED_IN',
  isLoggedIn
})

export const setUsername = username => ({
  type: 'SET_USERNAME',
  username
})

export const registerUser = user => (dispatch, getState) => {
  axios.post(`/api/auth/user/signup`, user, { withCredentials: true })
    .then(res => {
      console.log(res)
      dispatch(setIsLoggedIn(true))
    })
    .catch(res => {
      console.log(res)
    })
}

export const loginUser = user => (dispatch, getState) => {
  let cookiePW = user.user.password
  
  // axios.post(`/api/auth/user/login`, user, { withCredentials: true })
  //   .then(res => {
  //     document.cookie = `email=${res.data.response.user.email}`
  //     document.cookie = `password=${cookiePW}`

  //     dispatch(setUsername(res.data.response.user.username))
  //     dispatch(setIsLoggedIn(true))
  //     return
  //   })
  //   .then(() => dispatch(listNotes()))
  //   .catch(res => {
  //     console.log(res)
  //   })

  // res is a user obj
  let res = {
    data: {
      response: {
        user: {
          email: 'someone@example.com',
          username: 'Someone'
        }
      }
    }
  }

  // first then
  document.cookie = `email=${res.data.response.user.email}`
  document.cookie = `password=${cookiePW}`

  dispatch(setUsername(res.data.response.user.username))
  dispatch(setIsLoggedIn(true))

  // second then
  // dispatch(listNotes())
}

export const logoutUser = () => (dispatch, getState) => {
  // axios.post(`api/auth/user/logout`, {}, { withCredentials: true })
  //   .then(res => {
  //     dispatch(setEmail(''))
  //     dispatch(setUsername(''))
  //     dispatch(setIsLoggedIn(false))
  //   })
  //   .catch(res => {
  //     console.log(res)
  //   })

  dispatch(setEmail(''))
  dispatch(setUsername(''))
  dispatch(setIsLoggedIn(false))
}
