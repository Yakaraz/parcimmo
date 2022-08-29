import { always, identity, prop, propOr } from 'ramda'

export const noop = () => always(null)

// createReducer :: (State, Object) -> (State, Action) -> State
export const createReducer =
  (initialState, handlers) =>
  (state = initialState, action = {}) =>
    propOr(identity, prop('type', action), handlers)(state, action)
