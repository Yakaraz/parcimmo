/* eslint-disable no-return-assign */
import { complement, propEq } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { timer } from 'rxjs'
import * as rx from 'rxjs/operators'
import * as User from '../../redux/state/auth/user.state'
import { extractInfoFromJWT } from '../../utils/common.utils'
import { catchObservableError } from '../../utils/observable.utils'

// authFromCookie :: Epic -> Observable Action
export const tokenExpirationChecker = (action$, state$, { cookies }) =>
  action$.pipe(
    rx.filter(complement(propEq('type', User.LOGOUT))),
    rx.map(() => cookies.get('token')),
    rx.map(extractInfoFromJWT),
    rx.filter(expiresAt => expiresAt && +expiresAt <= Date.now()),
    rx.map(User.logout),
  )

// logout :: Epic -> Observable Action
export const logout = (action$, state$, { cookies, history }) =>
  action$.pipe(
    ofType(User.LOGOUT),
    rx.tap(() => cookies.remove('token', { path: '/' })),
    rx.debounce(() => timer(200)),
    rx.map(() => history.push('/')),
    rx.ignoreElements(),
    catchObservableError(),
  )

export default combineEpics(tokenExpirationChecker, logout)
