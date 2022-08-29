/* eslint-disable no-return-assign */
import { complement, ifElse, isNil, pipe, prop } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import * as rx from 'rxjs/operators'
import * as Login from '../../redux/state/auth/login.state'
import * as Token from '../../redux/state/auth/token.state'
import {
  extractInfoFromJWT,
  isTokenCookieStillViable,
} from '../../utils/common.utils'
import { handleError } from '../../utils/http.utils'
import {
  catchObservableError,
  logObservableError,
} from '../../utils/observable.utils'

// login :: Epic -> Observable Action
export const login = (action$, state$, { fetchApi }) =>
  action$.pipe(
    ofType(Login.LOG_IN),
    rx.mergeMap(({ username, password }) =>
      fetchApi(`/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }),
    ),
    rx.map(
      handleError(
        pipe(
          prop('accessToken'),
          ifElse(isNil, Login.reject, pipe(extractInfoFromJWT, Token.register)),
        ),
      )(Login.reject),
    ),
    catchObservableError(),
  )

// checkCookie :: Observable Action -> Observable Action
const checkCookie = (action$, state$, { cookies }) =>
  action$.pipe(
    ofType(Login.ENTER_APP),
    rx.map(() => cookies.get('token')),
    rx.filter(complement(isNil)),
    rx.filter(isTokenCookieStillViable),
    rx.map(extractInfoFromJWT),
    rx.map(token => Token.register(token)),
    logObservableError(),
  )

export default combineEpics(login, checkCookie)
