import React from 'react'
import { always } from 'ramda'
import './filters.style.scss'
import { FILTER_TYPE } from '../../utils/common.utils'

const Filters = ({
  openFiltersModal = false,
  submitFilter,
  fetching,
  toggleFilter = always(null),
}) => (
  <div
    className={`modal ${openFiltersModal && 'is-active'}`}
    data-component="filters"
  >
    <div className="modal-background" />
    <form id="modal-filters" className="modal-card" onSubmit={submitFilter}>
      <header className="modal-card-head">
        <p className="modal-card-title">
          <span className="icon icon-down-arrow-circle has-text-primary pl-3 pr-5" />
          Filtrez les résultats.
        </p>
        <button
          type="button"
          className="delete"
          aria-label="close"
          onClick={() => toggleFilter()}
        />
      </header>
      <section className="modal-card-body">
        <div className="field">
          <label className="label" htmlFor="control">
            Caractéristiques du lots :
            <div className="controls">
              <div className="control">
                <input
                  className="input"
                  id={FILTER_TYPE.IDENTIFIANT}
                  type="text"
                  placeholder="IDENTIFIANT"
                />
                <input
                  className="input"
                  id={FILTER_TYPE.CODE_POSTAL}
                  type="text"
                  placeholder="Code Postal"
                />
              </div>
            </div>
          </label>
        </div>
      </section>
      <footer className="modal-card-foot">
        <button
          className={`button is-primary is-medium ${fetching && 'is-loading'}`}
          type="submit"
        >
          Valider
        </button>
      </footer>
    </form>
  </div>
)

export default Filters
