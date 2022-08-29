import React from 'react'
import { Link } from 'react-router-dom'

const LotRow = ({ data, propertyTypeDico }) => (
  <div className="columns is-gapless box is-vcentered is-row">
    <div className="column has-text-weight-normal">
      <p>
        <Link
          to={`/bien/${data.id}/informations`}
          className="has-text-primary has-text-weight-bold"
        >
          {data.idLot}
        </Link>
      </p>
      <p>Immeuble - {data.codeImmeuble}</p>
      <p>Lot - {Math.round(data.codeLot)}</p>
    </div>
    <div className="column">
      <p className="has-text-weight-bold">{data.adresse.codePostal}</p>
      <p>{data.adresse.rue}</p>
      <p className="has-text-weight-semibold">{data.adresse.ville}</p>
    </div>
    <div className="column">
      <p className="has-text-weight-bold">{propertyTypeDico[data.type]}</p>
      <p>{data.occupancy}</p>
    </div>
    <div className="column">
      {data.scheduledVisitStatus ? (
        <p>{data.scheduledVisitStatus}</p>
      ) : (
        <button type="button" className="button is-primary is-outlined">
          <span>
            <span className="is-capitalized">à</span> attribuer
          </span>
          <span className="icon">
            <i className="" />
          </span>
        </button>
      )}
    </div>
    <div className="column">
      {data.scheduledVisitAt ? (
        <p className="has-text-weight-bold">
          {new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          }).format(Date.parse(data.scheduledVisitAt))}
        </p>
      ) : (
        <p>?</p>
      )}
    </div>
    <div className="column">
      {data.planifiedAt ? (
        <p className="has-text-weight-bold">
          {new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          }).format(Date.parse(data.planifiedAt))}
          )
        </p>
      ) : (
        <button type="button" className="button is-primary is-outlined">
          <span>
            <span className="is-capitalized">à</span> planifier
          </span>
          <span className="icon">
            <i className="" />
          </span>
        </button>
      )}
    </div>
  </div>
)

export default LotRow
