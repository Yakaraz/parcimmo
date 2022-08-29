import { always, equals, ifElse, map, pipe, range, tap } from 'ramda'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Lot from '../../redux/state/lot.state'
import { FILTER_TYPE, SORT_TYPE } from '../../utils/common.utils'
import LotRow from './lot-row'
import LotRowLoading from './lot-row-loading'
import TopBar from './top-bar'

import './lots.style.scss'

const mapContent = (properties, propertyTypeDico) =>
  properties &&
  properties.map(row => (
    <LotRow key={row.id} data={row} propertyTypeDico={propertyTypeDico} />
  ))

const whichLogo = ifElse(
  equals(SORT_TYPE.ASC),
  always('icon-down-arrow-circle flip'),
  always('icon-down-arrow-circle'),
)

export default ({ pageSize = 5 }) => {
  const dispatch = useDispatch()

  const onMount = useCallback(() => dispatch(Lot.fetch()), [dispatch])
  const onUnMount = useCallback(() => dispatch(Lot.clean()), [dispatch])

  const setSort = useCallback(data => dispatch(Lot.setSort(data)), [dispatch])

  const toggleFilter = useCallback(
    () => dispatch(Lot.toggleFilter()),
    [dispatch],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submitFilter = useCallback(
    pipe(
      tap(e => e.preventDefault()),
      e => [
        e.target
          .querySelector(
            `[data-component=filters] form#modal-filters input#${FILTER_TYPE.IDENTIFIANT}`,
          )
          .value.trim(),
        e.target
          .querySelector(
            `[data-component=filters] form#modal-filters input#${FILTER_TYPE.CODE_POSTAL}`,
          )
          .value.trim(),
      ],
      ([idlot, zipcode]) => dispatch(Lot.setFilters(idlot, zipcode)),
    ),
    [dispatch],
  )

  const state = useSelector(rootState => ({
    content: rootState.lot.content,
    number: rootState.lot.number,
    last: rootState.lot.last,
    fetching: rootState.lot.fetching,
    numberOfElements: rootState.lot.numberOfElements,
    sort: rootState.lot.sort,
    errors: rootState.lot.errors,
    filters: rootState.lot.filters,
    openFiltersModal: rootState.lot.openFiltersModal,
    propertyTypeDico: rootState.initialloading.dictionaries.propertyType,
  }))

  useEffect(() => {
    onMount()
    return () => onUnMount()
  }, [onMount, onUnMount])

  return (
    <section className="section">
      {state.openFiltersModal
        ? document.querySelector('html').setAttribute('class', 'is-clipped')
        : document.querySelector('html').setAttribute('class', '')}
      <TopBar
        total={state.numberOfElements}
        openFiltersModal={state.openFiltersModal}
        filters={state.filters}
        fetching={state.fetching}
        submitFilter={submitFilter}
        toggleFilter={toggleFilter}
      />
      <div data-component="lots" className="columns">
        <div className="column is-12">
          <div className="columns is-gapless is-vcentered has-text-weight-bold is-title is-uppercase">
            <div
              className={`column head-column ${
                state.sort.name === 'idLot' && 'has-text-primary'
              }`}
              role="button"
              tabIndex="0"
              onClick={() => setSort('idLot')}
              onKeyDown={() => {}}
            >
              identifiant
              <span
                className={`icon ${
                  state.sort.name === 'idLot'
                    ? whichLogo(state.sort.direction)
                    : 'icon-down-arrow-circle has-text-grey-light flip'
                }`}
              />
            </div>
            <div
              className={`column head-column ${
                state.sort.name === 'adresse_codePostal' && 'has-text-primary'
              }`}
              role="button"
              tabIndex="0"
              onClick={() => setSort('adresse_codePostal')}
              onKeyDown={() => {}}
            >
              code postal
              <span
                className={`icon ${
                  state.sort.name === 'adresse_codePostal'
                    ? whichLogo(state.sort.direction)
                    : 'icon-down-arrow-circle has-text-grey-light flip'
                }`}
              />
            </div>
            <div className="column">type</div>
            <div className="column">attribution visite</div>
            <div className="column">à visiter avant</div>
            <div className="column">planifiée le</div>
          </div>
          {mapContent(state.content, state.propertyTypeDico)}
          {!state.last &&
            state.fetching &&
            map(index => <LotRowLoading key={index} />)(range(0, pageSize))}
        </div>
      </div>
    </section>
  )
}
