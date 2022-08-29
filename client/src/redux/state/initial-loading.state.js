import moment from 'moment'
import {
  adjust,
  always,
  append,
  assoc,
  evolve,
  F,
  findIndex,
  pipe,
  propEq,
  T,
  __,
} from 'ramda'
import { createReducer } from '../../utils/redux.utils'

// déclaration du state initial
export const INITIAL_STATE = {
  ready: false,
  steps: [],
  message: 'Chargement ...',
  loadedAt: moment().toISOString(),
  loading: true,
  errored: false,
  dictionaries: {},
}

export const STEP_DICTIONARIES = 'dictionaries'

// déclaration des types d'actions ou dit "actions"

export const LOAD_DATA = '@parcimmo/InitialLoading/LOAD_DATA'
//
export const SYNCHRONIZE = '@parcimmo/InitialLoading/SYNCHRONIZE'

export const RELOAD_DATA = '@parcimmo/InitialLoading/RELOAD_DATA'

export const ERROR = '@parcimmo/InitialLoading/ERROR'

export const ADD_STEP = '@parcimmo/InitialLoading/ADD_STEP'

export const CHANGE_STEP_CURSOR = '@parcimmo/InitialLoading/CHANGE_STEP_CURSOR'

export const STEP_LOADED = '@parcimmo/InitialLoading/STEP_LOADED'

export const READY = '@parcimmo/InitialLoading/READY'

export const ADD_DICTIONARIES = '@parcimmo/InitialLoading/ADD_DICTIONARIES'

// clean :: () -> Action
export const CLEAN = '@parcimmo/InitialLoading/CLEAN'

// Actions creators

export const loadData = always({ type: LOAD_DATA })

export const clean = always({ type: CLEAN })
//
export const synchronize = always({ type: SYNCHRONIZE })

export const reload = always({ type: RELOAD_DATA })

export const error = always({ type: ERROR })

export const addStep = step => ({ type: ADD_STEP, step })

export const addDictionaries = dictionaries => ({
  type: ADD_DICTIONARIES,
  dictionaries,
})

export const changeStepCursor = step => cursor => ({
  type: CHANGE_STEP_CURSOR,
  step,
  cursor,
})

export const stepLoaded = step => ({ type: STEP_LOADED, step })

export const ready = always({ type: READY })

// Router :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [LOAD_DATA]: state =>
    evolve({
      steps: always([]),
      message: always('Chargement ...'),
      loadedAt: always(moment().toISOString()),
      loading: T,
    })(state),
  [ADD_STEP]: (state, { step }) =>
    evolve({
      steps: append({
        name: step,
        cursor: '',
        done: false,
      }),
    })(state),
  [ADD_DICTIONARIES]: (state, { dictionaries }) =>
    evolve({
      dictionaries: always(dictionaries),
    })(state),
  [STEP_LOADED]: (state, { step }) =>
    evolve({
      steps: steps =>
        pipe(
          findIndex(propEq('name', step)),
          adjust(__, assoc('done', true), steps),
        )(steps),
    })(state),
  [READY]: state =>
    evolve({
      ready: T,
      message: always('Bienvenue'),
      loading: F,
    })(state),
  [ERROR]: state => assoc('errored', true)(state),
  [CLEAN]: always(INITIAL_STATE),
})
