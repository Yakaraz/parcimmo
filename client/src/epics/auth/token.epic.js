/* eslint-disable no-return-assign */
import { decode } from 'jsonwebtoken'
import moment from 'moment'
import { always, ifElse, isNil, multiply, path, pipe, prop } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { of } from 'rxjs'
import * as rx from 'rxjs/operators'
import * as Login from '../../redux/state/auth/login.state'
import * as Token from '../../redux/state/auth/token.state'
import * as User from '../../redux/state/auth/user.state'
import { extractUserInfos } from '../../utils/common.utils'
import { catchObservableError } from '../../utils/observable.utils'

const getExpirationDate = pipe(decode, prop('exp'), multiply(1000))

// setCookie :: Epic -> Observable Action
export const setCookie = (action$, state$, { cookies, history }) =>
  action$.pipe(
    ofType(Token.REGISTER),
    rx.tap(
      pipe(
        path(['token', 'token']),
        token =>
          token &&
          cookies.set('token', token, {
            expires: moment(getExpirationDate(token)).toDate(),
            path: '/',
          }),
      ),
    ),
    rx.mergeMap(
      pipe(
        prop('redirectTo'),
        ifElse(isNil, always([Login.grant()]), redirectTo =>
          of(redirectTo).pipe(
            rx.tap(() => history.push(redirectTo)),
            rx.ignoreElements(),
          ),
        ),
      ),
    ),
    catchObservableError(),
  )

// setUserFromToken :: Epic -> Observable Action
export const setUserFromToken = action$ =>
  action$.pipe(
    ofType(Token.REGISTER),
    rx.map(path(['token', 'token'])),
    rx.map(extractUserInfos),
    rx.map(User.setTokenInfo),
    catchObservableError(),
  )

export default combineEpics(setCookie, setUserFromToken)
