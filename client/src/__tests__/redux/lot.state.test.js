import * as Lot from '../../redux/state/lot.state'

import { SORT_TYPE } from '../../utils/common.utils'

describe('Redux :: State :: Lot', () => {
  it('reduces to initial state by default', () => {
    const initialState = Lot.default()

    expect(initialState).toEqual(Lot.INITIAL_STATE)
  })

  it('reduces fetch action', () => {
    const initialState = Lot.default()
    const state = Lot.default(initialState, Lot.fetch())
    expect(state).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
  })

  it('reduces fetchNext action', () => {
    const initialState = Lot.default()
    const state = Lot.default(initialState, Lot.fetchNext())
    expect(state).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
  })

  it('reduces setSort action', () => {
    const initialState = Lot.default()
    const state = Lot.default(initialState, Lot.setSort('column_1'))
    expect(state).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: { name: 'column_1', direction: SORT_TYPE.ASC },
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
    const state_1 = Lot.default(state, Lot.setSort('column_1'))
    expect(state_1).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: { name: 'column_1', direction: SORT_TYPE.DESC },
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
    const state_2 = Lot.default(state_1, Lot.setSort('column_1'))
    expect(state_2).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
    // Si changement de column on revient au tri ASC par defaut
    const state_2alt = Lot.default(state_1, Lot.setSort('column_2'))
    expect(state_2alt).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: { name: 'column_2', direction: SORT_TYPE.ASC },
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
  })

  it('reduces setFilters action', () => {
    const initialState = Lot.default()
    const state = Lot.default(initialState, Lot.setFilters())
    expect(state).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
    const state_1 = Lot.default(state, Lot.setFilters(8))
    expect(state_1).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: 8, zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
    const state_2 = Lot.default(state_1, Lot.setFilters('', 8))
    expect(state_2).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: '', zipcode: 8 },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
    const state_3 = Lot.default(state_2, Lot.setFilters(42, 8))
    expect(state_3).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: true,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: 42, zipcode: 8 },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
  })

  it('reduces toggleFilter action', () => {
    const initialState = Lot.default()
    const state = Lot.default(initialState, Lot.toggleFilter())
    expect(state).toEqual({
      content: [],
      number: 0,
      last: false,
      fetching: false,
      pageSize: 5,
      numberOfElements: 0,
      sort: {},
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: true,
      propertyTypeDico: [],
      errors: [],
    })
    const state_1 = Lot.default(state, Lot.toggleFilter())
    expect(state_1).toEqual(initialState)
  })

  it('reduces received', () => {
    const initialState = Lot.default()
    const props = {
      content: ['glou', 'bi', 'boul', 'ga'],
      number: 0,
      last: false,
      pageable: { pageSize: 4, offset: 0 },
      numberOfElements: 4,
      openFiltersModal: false,
      propertyTypeDico: [],
    }
    const state = Lot.default(initialState, Lot.received(props))
    expect(state).toEqual({
      content: ['glou', 'bi', 'boul', 'ga'],
      number: 0,
      last: false,
      fetching: false,
      pageSize: 4,
      numberOfElements: 4,
      sort: {},
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
  })

  it('reduces receivedNext actions', () => {
    const initialState = Lot.default()
    const props = {
      content: ['glou', 'bi', 'boul', 'ga'],
      number: 0,
      last: false,
      pageable: { pageSize: 4, offset: 0 },
      numberOfElements: 4,
      openFiltersModal: false,
      propertyTypeDico: [],
    }
    const state = Lot.default(initialState, Lot.received(props))
    const props_1 = {
      content: ['glou', 'bi', 'boul', 'ga'],
      number: 1,
      last: false,
      pageable: { pageSize: 4, offset: 4 },
      numberOfElements: 4,
      openFiltersModal: false,
      propertyTypeDico: [],
    }
    const state_1 = Lot.default(state, Lot.receivedNext(props_1))
    expect(state_1).toEqual({
      content: ['glou', 'bi', 'boul', 'ga', 'glou', 'bi', 'boul', 'ga'],
      number: 1,
      last: false,
      fetching: false,
      pageSize: 4,
      numberOfElements: 8,
      sort: {},
      filters: { idlot: '', zipcode: '' },
      openFiltersModal: false,
      propertyTypeDico: [],
      errors: [],
    })
  })
})
