import {
  always,
  concat,
  evolve,
  ifElse,
  isEmpty,
  not,
  of,
  propEq,
  T,
} from 'ramda'
import { SORT_TYPE } from '../../utils/common.utils'
import { createReducer } from '../../utils/redux.utils'

// déclaration du state initial
export const INITIAL_STATE = {
  content: [],
  number: 0,
  last: false,
  fetching: false,
  pageSize: 5,
  sort: {},
  filters: {
    idlot: '',
    zipcode: '',
  },
  numberOfElements: 0,
  openFiltersModal: false,
  propertyTypeDico: [],
  errors: [],
}

// déclaration des types d'actions ou dit "actions"

// clean :: () -> Action
export const CLEAN = '@parcimmo/Lot/CLEAN'
// fetch :: () -> Action FETCH
export const FETCH = '@parcimmo/Lot/FETCH'
//
export const FETCH_NEXT = '@parcimmo/Lot/FETCH_NEXT'
//
export const SET_SORT = '@parcimmo/Lot/SET_SORT'
export const SET_FILTERS = '@parcimmo/Lot/SET_FILTERS'

export const TOGGLE_FILTER = '@parcimmo/Lot/TOGGLE_FILTER'

// received :: Offer -> Action RECEIVED
export const RECEIVED = '@parcimmo/Lot/RECEIVED'
export const RECEIVED_NEXT = '@parcimmo/Lot/RECEIVED_NEXT'

// REJECT :: String
export const REJECT = '@parcimmo/Lot/REJECT_IF_ERRORS'

const nextDirection = ifElse(
  propEq('direction', SORT_TYPE.ASC),
  evolve({ direction: always(SORT_TYPE.DESC) }),
  always({}),
)

const updateSort =
  ({ sort }) =>
  name =>
    ifElse(
      isEmpty,
      () => ({ name, direction: SORT_TYPE.ASC }),
      ifElse(propEq('name', name), nextDirection, () => ({
        name,
        direction: SORT_TYPE.ASC,
      })),
    )(sort)

// Actions creators

// clean :: () -> Action
export const clean = always({ type: CLEAN })
// fetch :: () -> Action FETCH
export const fetch = always({ type: FETCH })

export const fetchNext = always({ type: FETCH_NEXT })

export const setSort = name => ({ type: SET_SORT, name })

export const setFilters = (idlot = '', zipcode = '') => ({
  type: SET_FILTERS,
  idlot,
  zipcode,
})

//
export const toggleFilter = always({ type: TOGGLE_FILTER })

// received :: Object -> Action RECEIVED
export const received = properties => ({ type: RECEIVED, properties })
export const receivedNext = properties => ({ type: RECEIVED_NEXT, properties })

// reject :: String -> Action
export const reject = errors => ({ type: REJECT, errors })

// Router :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [FETCH]: evolve({ fetching: T }),
  [FETCH_NEXT]: evolve({ fetching: T }),
  [SET_SORT]: (state, { name }) => ({
    ...state,
    sort: updateSort(state)(name),
    fetching: true,
  }),
  [SET_FILTERS]: (state, { idlot, zipcode }) => ({
    ...state,
    filters: { idlot, zipcode },
    fetching: true,
    openFiltersModal: false,
  }),
  [TOGGLE_FILTER]: evolve({ openFiltersModal: not }),
  [RECEIVED]: (state, { properties }) => ({
    ...state,
    content: properties.content,
    number: properties.number,
    last: properties.last,
    pageSize: properties.pageable.pageSize,
    numberOfElements: properties.numberOfElements,
    fetching: false,
  }),
  [RECEIVED_NEXT]: (state, { properties }) => ({
    ...state,
    content: concat(state.content)(properties.content),
    number: properties.number,
    last: properties.last,
    pageSize: properties.pageable.pageSize,
    numberOfElements: properties.pageable.offset + properties.numberOfElements,
    fetching: false,
  }),
  [CLEAN]: always(INITIAL_STATE),
  [REJECT]: (state, { errors }) => ({
    ...state,
    fetching: false,
    errors: of(errors),
  }),
})
