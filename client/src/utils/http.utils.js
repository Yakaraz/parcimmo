import {
  always,
  andThen,
  compose,
  cond,
  either,
  equals,
  filter,
  has,
  ifElse,
  includes,
  invoker,
  isEmpty,
  not,
  otherwise,
  pipe,
  prop,
  T,
  tap,
  toString,
  when,
  __,
} from 'ramda'
import { rejectMainError } from '../redux/state'

export const HTTP_ERROR_MESSAGES = Object.freeze({
  GLOBAL_ERROR_MESSAGE:
    'Une erreur est survenue veuillez contacter votre administrateur',
})

export const HTTP_ERRORS_TYPES = Object.freeze({
  REDIRECT: {
    LABEL: 'REDIRECT',
    SERVER_ERRORS: [
      '500',

      '501',

      '502',

      '503',

      '504',

      '505',

      '506',

      '507',

      '508',

      '509',

      '510',

      '511',
    ],
    OTHER_ERRORS: ['401', '403'],
  },
  TECHNICAL: { LABEL: 'TECHNICAL' },
})

export const URL_EXCLUDED_FROM_REDIRECT = ['api/auth']

const isStatusOK = pipe(
  toString,
  either(
    includes(__, HTTP_ERRORS_TYPES.REDIRECT.SERVER_ERRORS),
    includes(__, HTTP_ERRORS_TYPES.REDIRECT.OTHER_ERRORS),
  ),
  not,
)

const isResponseOK = either(
  pipe(prop('status'), isStatusOK),
  pipe(
    prop('url'),
    url => filter(path => url.includes(path))(URL_EXCLUDED_FROM_REDIRECT),
    isEmpty,
    not,
  ),
)

/**
 * httpWithErrorResponse :: {
 *  hasError :: Boolean,
 *  message :: String,
 *  debugMessage :: String,
 *  resp :: HttpResponse
 * }
 *
 * withHTTPError :: Promise -> Promise
 */
export const withHTTPError = pipe(
  otherwise(err => ({ hasError: true, error: err })),
  andThen(resp =>
    ifElse(
      isResponseOK,
      always({ hasError: false, resp }),
      always({
        type: HTTP_ERRORS_TYPES.REDIRECT.LABEL,
        hasError: true,
        error: {
          message: HTTP_ERROR_MESSAGES.GLOBAL_ERROR_MESSAGE,
          debugMessage: resp.statusText,
        },
      }),
    )(resp),
  ),
)

/**
 * httpWithErrorResponse :: {F
 *  hasError :: Boolean,
 *  message :: String,
 *  debugMessage :: String,
 *  resp :: HttpResponse
 * }
 *
 * withHTTPError :: Promise -> Promise
 */
export const withTechnicalError = pipe(
  otherwise(err => ({ hasUnexpectedError: true, error: err })),
  andThen(resp =>
    cond([
      [
        has('hasUnexpectedError'),
        err => ({
          type: HTTP_ERRORS_TYPES.REDIRECT.LABEL,
          hasError: true,
          error: {
            message: HTTP_ERROR_MESSAGES.GLOBAL_ERROR_MESSAGE,
            debugMessage: err.error,
          },
        }),
      ],
      [
        compose(equals(true), prop('hasError')),
        ({ message, debugMessage }) => ({
          type: HTTP_ERRORS_TYPES.TECHNICAL.LABEL,
          hasError: true,
          error: { message, debugMessage },
        }),
      ],
      [T, always(resp)],
    ])(resp),
  ),
)

/**
 * Returns a new http object with hasError indicator and message in case of error
 * @param {string} path - the path to the endpoint
 * @param {object} options - http fetch options like headers and methods...
 * @returns {promise}
 */
export const fetchApiWithErrors = (uri, path, options = {}) =>
  pipe(
    () => window.fetch(`${uri}${path}`, options),
    withHTTPError,
    andThen(
      pipe(
        when(
          has('hasError') && pipe(prop('hasError'), equals(false)),
          ({ resp }) => pipe(invoker(0, 'json'), withTechnicalError)(resp),
        ),
      ),
    ),
  )()

/**
 * Handle error in epic
 */

/**
 * Function that will write ton console the debugMessage and then throw the error to the state.
 * @param {*} reject the reject action to send error to redux state
 */
const logError = reject =>
  pipe(
    // eslint-disable-next-line no-console
    tap(err => console.error(err.debugMessage)),
    err => reject(err.message),
  )

export const responseHasErrors =
  has('hasError') && pipe(prop('hasError'), equals(true))

/**
 *  Function that launch actions according to errors messages from http.
 *  handleError :: Action -> Action -> HttpReponse -> Action | HttpResponse
 */
export const handleError = success => reject =>
  ifElse(
    responseHasErrors,
    resp =>
      pipe(
        prop('type'),
        when(equals(HTTP_ERRORS_TYPES.REDIRECT.LABEL), () =>
          logError(rejectMainError)(resp.error),
        ),
        when(equals(HTTP_ERRORS_TYPES.TECHNICAL.LABEL), () =>
          logError(reject)(resp.error),
        ),
      )(resp),
    success,
  )
