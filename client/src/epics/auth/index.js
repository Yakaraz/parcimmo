import { combineEpics } from 'redux-observable'
import Login from './login.epic'
import Token from './token.epic'
import User from './user.epic'

// La liste de toutes les epics de l'app
export default combineEpics(Login, User, Token)
