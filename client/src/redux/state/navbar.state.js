import { evolve, always, not } from 'ramda'
import { createReducer } from '../../utils/redux.utils'

// NavBar INITIAL_STATE :: State
export const INITIAL_STATE = {
  open: false,
}

// Actions

// clean :: () -> Action
export const TOGGLE_MENU = '@parcimmo/NavBar/TOGGLE_MENU'

// clean :: () -> Action
export const CLEAN = '@parcimmo/NavBar/CLEAN'

// Action creators:

// clean :: () -> Action
export const clean = always({ type: CLEAN })

// Action creators:

// toggle :: () -> Action
export const toggleMenu = always({ type: TOGGLE_MENU })

// Router :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [TOGGLE_MENU]: evolve({ open: not }),
  [CLEAN]: always(INITIAL_STATE),
})
