import { always, evolve, of, T } from 'ramda'
import { createReducer } from '../../utils/redux.utils'

// NavBar INITIAL_STATE :: State
export const INITIAL_STATE = {
  visits: [],
  fetching: false,
  errors: [],
}

// Actions

// clean :: () -> Action
export const CLEAN = '@parcimmo/Timeline/CLEAN'
// fetch :: () -> Action FETCH
export const FETCH = '@parcimmo/Timeline/FETCH'

// received :: Offer -> Action RECEIVED
export const RECEIVED = '@parcimmo/Timeline/RECEIVED'

// REJECT :: String
export const REJECT = '@parcimmo/Timeline/REJECT_IF_ERRORS'

// Action creators:

// clean :: () -> Action
export const clean = always({ type: CLEAN })
// fetch :: () -> Action FETCH
export const fetch = propertyId => ({ type: FETCH, propertyId })
// received :: Object -> Action RECEIVED
export const received = visits => ({ type: RECEIVED, visits })

// reject :: String -> Action
export const reject = errors => ({ type: REJECT, errors })

// Router :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [FETCH]: evolve({ fetching: T }),
  [CLEAN]: always(INITIAL_STATE),
  [RECEIVED]: (state, { visits }) => ({
    ...state,
    visits: [...visits],
    fetching: false,
  }),
  [REJECT]: (state, { errors }) => ({
    ...state,
    fetching: false,
    errors: of(errors),
  }),
})
