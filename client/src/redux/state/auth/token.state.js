import { always } from 'ramda'

// INITIAL_STATE :: State
export const INITIAL_STATE = {
  token: '',
  expiresAt: null,
}

// REGISTER :: String
export const REGISTER = '@parcimmo/Token/REGISTER'

// REMOVE :: String
export const REMOVE = '@parcimmo/Token/REMOVE'

// register :: String -> Action REGISTER
export const register = (token = '', redirectTo = null) => ({
  type: REGISTER,
  token,
  redirectTo,
})

// remove :: String -> Action REMOVE
export const remove = always({ type: REMOVE })
