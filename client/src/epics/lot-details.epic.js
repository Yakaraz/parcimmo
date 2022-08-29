import { combineEpics, ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import { FETCH, received, reject } from '../redux/state/lot-details.state'
import { handleError } from '../utils/http.utils'
import { mapDetails } from '../utils/mapper.utils'

export const fetchDetails = (action$, state$, { fetchApi, cookies }) =>
  action$.pipe(
    ofType(FETCH),
    mergeMap(action =>
      fetchApi(`/api/properties/${action.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      }),
    ),
    map(handleError((mapDetails, received))(reject)),
  )
export default combineEpics(fetchDetails)
