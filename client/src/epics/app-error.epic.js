import { combineEpics, ofType } from 'redux-observable'
import { mapTo } from 'rxjs/operators'
import { REJECT_MAIN_ERROR } from '../redux/state'
import { logout } from '../redux/state/auth/user.state'
import { catchObservableError } from '../utils/observable.utils'
/**
 *  Function to logout on server error
 *  handleMainError:: Observable Action -> Observable Action
 */

export const handleMainError = action$ =>
  action$.pipe(
    ofType(REJECT_MAIN_ERROR),
    mapTo(logout()),
    catchObservableError(),
  )

export default combineEpics(handleMainError)
