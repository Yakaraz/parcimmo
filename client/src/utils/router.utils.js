import moment from 'moment'
import 'moment/locale/fr'
import { pathToRegexp } from 'path-to-regexp'
import qs from 'query-string'
import {
  addIndex,
  always,
  complement,
  compose,
  defaultTo,
  drop,
  ifElse,
  isNil,
  map,
  match,
  nth,
  omit,
  pipe,
  prop,
  reduce,
  replace,
  test,
  uncurryN,
} from 'ramda'
import { Observable } from 'rxjs'
import urlParse from 'url-parse'

moment.locale('fr')
// replaceKeyQueryBySearch :: QueriedLocation -> Location

export const replaceKeyQueryBySearch = queriedLocation => ({
  ...omit(['query'], queriedLocation),
  search: queriedLocation.query,
})

// urlToLocation :: QueriedLocation -> Location
export const urlToLocation = compose(replaceKeyQueryBySearch, urlParse)

// removeQueries :: String -> String
export const removeQueries = replace(/\?(.*)/, '')

// getQueryStringOr :: String -> String -> String -> String
export const getQueryStringOr = uncurryN(
  3,
  qname => defaultValue =>
    pipe(
      match(/\?.*/),
      nth(0),
      defaultTo(''),
      search => qs.parse(search),
      defaultTo({}),
      prop(qname),
      defaultTo(defaultValue),
    ),
)
// removeRefererFromQueryString :: String -> String
export const removeRefererFromQueryString = pipe(
  replace(/\?from=[/a-z-]+&/g, ''),
)

// routeMatch :: String -> Route -> Boolean
export const routeMatch = uncurryN(2, path =>
  pipe(
    prop('pattern'),
    pattern => pathToRegexp(pattern).exec(removeQueries(path)),
    complement(isNil),
  ),
)

// routeParameters :: String -> Route -> Object
export const routeParameters = uncurryN(2, path =>
  pipe(
    route => {
      const keys = []
      const result = pathToRegexp(route.pattern, keys).exec(path)

      return [keys, route, result ? drop(1, result) : []]
    },
    ifElse(
      compose(routeMatch(path), nth(1)),
      // eslint-disable-next-line no-unused-vars
      ([keys, route, result]) =>
        addIndex(map)((value, i) => [keys[i].name, value])(result),
      always([]),
    ),
    reduce(
      (params, [key, value]) => ({
        ...params,
        [key]: value,
      }),
      {},
    ),
  ),
)

// isActive :: RegExp -> String -> String
export const isActive = uncurryN(2, re =>
  ifElse(test(re), always('active'), always('')),
)

/**
 * History utils
 */

// listenWhenHistoryPop :: History -> Observable Location
export const listenWhenHistoryPop = history =>
  Observable.create(observer =>
    history.listen(
      (location, action) => action === 'POP' && observer.next(location),
    ),
  )
