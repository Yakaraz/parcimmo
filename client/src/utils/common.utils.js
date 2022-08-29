/* eslint-disable import/prefer-default-export */
import { decode } from 'jsonwebtoken'
import moment from 'moment'
import { defaultTo, once, pickAll, pipe, prop } from 'ramda'
import Cookies from 'universal-cookie'

export const SORT_TYPE = Object.freeze({
  ASC: 'asc',
  DESC: 'desc',
})

export const FILTER_TYPE = Object.freeze({
  IDENTIFIANT: 'idlot',
  CODE_POSTAL: 'zipcode',
})

// extractInfoFromJWT :: String -> Object
export const extractInfoFromJWT = token =>
  pipe(decode, defaultTo({}), prop('exp'), exp => ({
    token,
    expiresAt: moment(exp * 1000).toDate(),
  }))(token)

/**
 * @type Cookies :: @ref https://www.npmjs.com/package/universal-cookie
 *
 * accessCookies :: () -> Cookies
 */
export const accessCookies = once(() => new Cookies())

// getCookie :: String -> Maybe String
export const getCookie = label => accessCookies().get(label)

// removeCookie :: String -> ()
export const removeCookie = label => accessCookies().remove(label)

// hasCookie :: String -> Boolean
export const hasCookie = label => !!getCookie(label)

// setCookie :: String -> * -> ()
export const setCookie = label => value =>
  accessCookies().set(label, value, {
    path: '/',
    expires: moment().add(100, 'years').toDate(),
  })

// getTokenExpiration :: String -> Number
export const getTokenExpiration = token => {
  const decodedToken = decode(token)
  return prop('exp', decodedToken)
}

// isTokenStillViable :: String -> Boolean
export const isTokenStillViable = jwt => getTokenExpiration(jwt) < Date.now()

// isTokenCookieStillViable :: () -> Boolean
export const isTokenCookieStillViable = () => {
  const token = getCookie('token')
  return isTokenStillViable(token)
}

export const extractUserInfos = pipe(
  decode,
  defaultTo({}),
  pickAll(['id', 'user', 'roles']),
  ({ id, user, roles }) => ({
    id,
    user,
    roles,
  }),
)

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  return moment(date).format(format)
}
