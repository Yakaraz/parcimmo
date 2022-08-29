import { createReducer } from '../../../utils/redux.utils'

// INITIAL_STATE :: State
export const INITIAL_STATE = {
  submitting: false,
  error: false,
  username: null,
  password: null,
}

// LOG_IN :: String
export const LOG_IN = '@parcimmo/Auth/LogIn/LOG_IN'
// REJECT :: String
export const REJECT = '@parcimmo/Auth/LogIn/REJECT'
// GRANT :: String
export const GRANT = '@parcimmo/Auth/LogIn/GRANT'
// ENTER_APP :: String
export const ENTER_APP = '@parcimmo/Auth/LogIn/ENTER_APP'

// logIn :: (String, String) -> Action LOG_IN
export const logIn = (username = '', password = '') => ({
  type: LOG_IN,
  username,
  password,
})

// reject :: String -> Action REJECT
export const reject = error => ({
  type: REJECT,
  error,
})

// grant :: String -> Action GRANT
export const grant = () => ({
  type: GRANT,
})

export const enterApp = () => ({
  type: ENTER_APP,
})

// LogIn :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [LOG_IN]: (state, { username, password }) => ({
    ...state,
    submitting: true,
    username,
    password,
  }),

  [REJECT]: state => ({
    ...state,
    submitting: false,
    error: true,
  }),

  [GRANT]: () => ({
    ...INITIAL_STATE,
    submitting: false,
  }),
})
