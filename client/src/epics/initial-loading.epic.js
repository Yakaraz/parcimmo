import { all, always, nth, path, pipe, propEq } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { filter, map, mapTo, mergeMap, withLatestFrom } from 'rxjs/operators'
import {
  addDictionaries,
  addStep,
  ADD_STEP,
  error,
  LOAD_DATA,
  ready,
  stepLoaded,
  STEP_DICTIONARIES,
  STEP_LOADED,
  SYNCHRONIZE,
} from '../redux/state/initial-loading.state'
import { handleError } from '../utils/http.utils'
import { catchObservableError } from '../utils/observable.utils'

export const initializeResourceLoading = action$ =>
  action$.pipe(
    ofType(LOAD_DATA),
    mergeMap(always([STEP_DICTIONARIES])),
    map(addStep),
    catchObservableError(),
  )

export const synchronizeResource = action$ =>
  action$.pipe(
    ofType(SYNCHRONIZE),
    mergeMap(always([STEP_DICTIONARIES])),
    map(addStep),
    catchObservableError(),
  )

export const isStep = step =>
  pipe(ofType(ADD_STEP), filter(propEq('step', step)))

export const loadDictionaries = (action$, state$, { fetchApi, cookies }) =>
  action$.pipe(
    isStep(STEP_DICTIONARIES),
    mergeMap(() =>
      fetchApi(`/api/dictionaries`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      }),
    ),
    mergeMap(
      handleError(dicos => [
        addDictionaries(dicos),
        stepLoaded('dictionaries'),
      ])([error]),
    ),
    catchObservableError(),
  )

export const readyWhenEverythingIsLoaded = (action$, state$) =>
  action$.pipe(
    ofType(STEP_LOADED),
    withLatestFrom(state$),
    filter(
      pipe(
        nth(1),
        path(['initialloading', 'steps']),
        all(propEq('done', true)),
      ),
    ),
    mapTo(ready()),
    catchObservableError(),
  )

export default combineEpics(
  initializeResourceLoading,
  synchronizeResource,
  loadDictionaries,
  readyWhenEverythingIsLoaded,
)
