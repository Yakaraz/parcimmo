import { combineReducers } from 'redux'
import * as login from './login.state'
import * as token from './token.state'
import * as user from './user.state'

export default combineReducers({
  login: login.default,
  user: user.default,
})

export { login, token }
