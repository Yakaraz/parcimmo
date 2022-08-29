import { pipe } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import { FETCH, received, reject } from '../redux/state/timeline.state'
import { handleError } from '../utils/http.utils'

export const fetchTimeline = (action$, state$, { fetchApi, cookies }) =>
  action$.pipe(
    ofType(FETCH),
    mergeMap(({ propertyId }) =>
      fetchApi(`/api/visits/property/${propertyId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      }),
    ),
    map(handleError(pipe(received))(reject)),
  )

export default combineEpics(fetchTimeline)
