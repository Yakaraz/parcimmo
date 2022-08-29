import { always, ifElse, isEmpty, nth, pipe } from 'ramda'
import { combineEpics, ofType } from 'redux-observable'
import { fromEvent } from 'rxjs'
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators'
import {
  FETCH,
  fetchNext,
  FETCH_NEXT,
  received,
  receivedNext,
  reject,
  SET_FILTERS,
  SET_SORT,
} from '../redux/state/lot.state'
import { FILTER_TYPE } from '../utils/common.utils'
import { handleError } from '../utils/http.utils'
import { paginationLots as pagination } from '../utils/mapper.utils'

const scroll$ = fromEvent(window, 'scroll').pipe(debounceTime(500))

const buildQueryFromSort = ifElse(
  isEmpty,
  always(''),
  ({ name, direction }) => `&sort=${name},${direction}`,
)

const buildQueryFromFilters = ({ idlot, zipcode }) =>
  (!isEmpty(idlot) &&
    !isEmpty(zipcode) &&
    `&${FILTER_TYPE.IDENTIFIANT}=${idlot}&${FILTER_TYPE.CODE_POSTAL}=${zipcode}`) ||
  (!isEmpty(idlot) && `&${FILTER_TYPE.IDENTIFIANT}=${idlot}`) ||
  (!isEmpty(zipcode) && `&${FILTER_TYPE.CODE_POSTAL}=${zipcode}`) ||
  ''

export const fetchLots = (action$, state$, { fetchApi, cookies }) =>
  action$.pipe(
    ofType(FETCH, SET_SORT, SET_FILTERS),
    withLatestFrom(state$),
    map(nth(1)),
    mergeMap(({ lot }) =>
      fetchApi(
        `/api/properties?page=0&size=${lot.pageSize}${buildQueryFromSort(
          lot.sort,
        )}${buildQueryFromFilters(lot.filters)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    ),
    map(handleError(pipe(pagination, received))(reject)),
  )

export const fetchNextLots = (action$, state$, { fetchApi, cookies }) =>
  action$.pipe(
    ofType(FETCH_NEXT),
    withLatestFrom(state$),
    map(nth(1)),
    mergeMap(({ lot }) =>
      fetchApi(
        `/api/properties?page=${lot.number + 1}&size=${
          lot.pageSize
        }${buildQueryFromSort(lot.sort)}${buildQueryFromFilters(lot.filters)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    ),
    map(handleError(pipe(pagination, receivedNext))(reject)),
  )

export const triggerNextLot = (action$, state$) =>
  action$.pipe(
    always(scroll$),
    withLatestFrom(state$),
    map(nth(1)),
    filter(({ lot }) => !lot.last),
    filter(() => window.document.querySelector('[data-component="lots"]')),
    filter(
      () =>
        window.scrollY + window.document.documentElement.clientHeight >
        window.document.body.scrollHeight - 250,
    ),
    map(() => fetchNext()),
  )

export default combineEpics(fetchLots, fetchNextLots, triggerNextLot)
