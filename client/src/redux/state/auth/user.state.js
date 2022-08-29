import { always } from 'ramda'
import { createReducer } from '../../../utils/redux.utils'
import { ANONYMOUS_ROLE } from '../../../utils/roles.utils'
/**
 * @type UserState :: {
 *  id :: String,
 *  role :: String,
 *  fetching :: Boolean,
 *
 */

// INITIAL_STATE :: UserState
export const INITIAL_STATE = {
  id: '',
  user: '',
  roles: [ANONYMOUS_ROLE],
  fetching: false,
}

// SET_TOKEN_INFO :: String
export const SET_TOKEN_INFO = '@espaceclient/User/SET_TOKEN_INFO'

// LOGOUT :: String
export const LOGOUT = '@espaceclient/User/LOGOUT'

// setTokenInfo :: String -> Action
export const setTokenInfo = token => ({
  type: SET_TOKEN_INFO,
  token,
})

// logout :: String -> Action
export const logout = always({ type: LOGOUT })

// User :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [SET_TOKEN_INFO]: (state, { token }) => ({
    ...state,
    id: token.id,
    user: token.user,
    roles: token.roles,
  }),
  [LOGOUT]: always(INITIAL_STATE),
})
