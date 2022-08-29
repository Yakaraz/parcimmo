/* eslint-disable no-console */
import { configureStore } from '@reduxjs/toolkit'
import { pipe, uncurryN } from 'ramda'

// debugReducer :: Function -> Object -> Object -> Object
const debugReducer = reducer => (state, action) => {
  console.groupCollapsed(action.type || '')
  console.log('ACTION :: ', action)
  console.log('CURRENT STATE :: ', state)

  const newState = reducer(state, action)

  console.log('NEW STATE :: ', newState)
  console.groupEnd()

  return newState
}

// Store :: State -> (Store -> Store) -> (Action -> State -> State) -> Store
const Store = uncurryN(
  3,
  initialState => middleware => reducer =>
    pipe(() =>
      configureStore({
        reducer: debugReducer(reducer),
        middleware,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: initialState,
      }),
    )(),
)

export default Store
