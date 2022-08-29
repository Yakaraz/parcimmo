/* eslint-disable no-console */
import { always, pipe, tap } from 'ramda'
import { of } from 'rxjs'
import { catchError, merge } from 'rxjs/operators'
// catchObservableError :: () -> Observable -> Observable
export const catchObservableError = () =>
  catchError((err, source) =>
    pipe(
      tap(_ => process.env.REACT_APP_DEBUG && console.error(_)),
      always(source),
    )(err),
  )

// catchObservableErrorAndTriggerAction :: -> Observable Action -> Observable Action
export const catchObservableErrorAndTriggerAction = action =>
  catchError((err, source) =>
    pipe(
      tap(_ => process.env.REACT_APP_DEBUG && console.error(_)),
      () => of(action(err)).pipe(merge(source)),
    )(err),
  )

/**
 * A custom rx operator to log any observable errors and
 * restore the stream
 *
 * logObservableError :: (Error -> String) -> Observable * -> Observable *
 */
export const logObservableError = handler =>
  catchError((error, caught$) => {
    console.error('Epic Errored', handler ? handler(error) : error)

    return caught$
  })
