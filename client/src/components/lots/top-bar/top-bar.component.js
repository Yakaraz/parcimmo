import React from 'react'
import { always } from 'ramda'
import Filters from '../../filters'

const TopBar = ({
  total = 0,
  openFiltersModal = false,
  filters = {},
  submitFilter,
  fetching,
  toggleFilter = always(null),
}) => (
  <div className="level">
    <div className="level-left">
      <p className="level-item subtitle is-5">
        <strong>{total} </strong> {total > 1 ? '. Lots' : '. Lot'}
      </p>
    </div>
    <div className="level-right ">
      <button
        className={`button is-rounded is-outlined is-info is-light pr-6 ${
          fetching && 'is-loading'
        }`}
        type="button"
        onClick={() => toggleFilter()}
      >
        Filtres
        {(filters.idlot !== '' || filters.zipcode !== '') && (
          <>
            <span className="mr-4">: </span>
            <div className="field is-grouped is-grouped-multiline">
              {filters.idlot !== '' && (
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag has-text-info">Identifiant</span>
                    <span className="tag is-info is-rounded">
                      {filters.idlot}
                    </span>
                  </div>
                </div>
              )}
              {filters.zipcode !== '' && (
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag has-text-info">Code Postal</span>
                    <span className="tag is-info is-rounded">
                      {filters.zipcode}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </button>
    </div>
    <Filters
      openFiltersModal={openFiltersModal}
      filters={filters}
      submitFilter={submitFilter}
      fetching={fetching}
      toggleFilter={toggleFilter}
    />
  </div>
)

export default TopBar
