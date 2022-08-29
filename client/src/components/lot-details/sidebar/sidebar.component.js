import { prop } from 'ramda'
import React from 'react'
import { useSelector } from 'react-redux'
import './sidebar.style.scss'

export default () => {
  const state = useSelector(rootState => ({
    id: rootState.lotdetails.id,
    idLot: rootState.lotdetails.idLot,
    numeroCite: rootState.lotdetails.numeroCite,
    codeImmeuble: rootState.lotdetails.codeImmeuble,
    codeBatiment: rootState.lotdetails.codeBatiment,
    codeLot: rootState.lotdetails.codeLot,
    adresse: rootState.lotdetails.adresse,
    type: rootState.lotdetails.type,
    etatDuLot: rootState.lotdetails.etatDuLot,
    scheduledVisitAt: rootState.lotdetails.scheduledVisitAt,
    planifiedAt: rootState.lotdetails.planifiedAt,
    teams: rootState.lotdetails.teams,
    fetching: rootState.lotdetails.fetching,
    propertyTypeDico: rootState.initialloading.dictionaries.propertyType,
  }))

  return (
    <div className="aside has-background-white" data-component="sidebar">
      <section className="section">
        <div>
          <h1 className="is-size-4 has-text-weight-bold has-text-primary-dark">
            Identifiant {state.idLot}
          </h1>
          <p>Immeuble - {state.codeImmeuble}</p>
          <p>Lot - {state.codeLot}</p>
        </div>
        <div>
          <h2 className="mb-2 is-size-5 has-text-weight-bold has-text-primary">
            Prochaine Visite
          </h2>
          <div>
            <p className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
              Gestionnaire attribué
            </p>
            <button className="button is-outlined is-info" type="button">
              <span className="is-capitalized mr-1">à</span> attribuer
            </button>
            <p className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
              à visiter avant le
            </p>
            <p className="has-text-weight-bold">
              {state.scheduledVisitAt || '-/-/-'}
            </p>
            <p className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
              visite planifée le
            </p>
            {state.planifiedAt ? (
              <p className="has-text-weight-bold">{state.planifiedAt}</p>
            ) : (
              <button className="button is-outlined is-info" type="button">
                <span className="is-capitalized mr-1">à</span> plannifier
              </button>
            )}
          </div>
        </div>
        <div className="lot-props">
          <h2 className="is-size-5 has-text-weight-bold has-text-primary">
            Caractéristiques du lot
          </h2>
          <div>
            <p className="is-uppercase">{state.adresse.rue}</p>
            {state.adresse.rue2 && (
              <p className="is-uppercase">{state.adresse.rue2}</p>
            )}
            <p className="is-uppercase has-text-weight-medium">
              {state.adresse.codePostal}, {state.adresse.ville}
            </p>
          </div>
          <div>
            <p className="is-uppercase has-text-weight-medium">
              {state.propertyTypeDico[state.type]}
            </p>
            <p className="is-uppercase">{state.etatDuLot}</p>
          </div>
          <div>
            <p className="is-uppercase has-text-weight-medium">
              Groupe - {prop('name')(state.teams[0]) || 'aucun'}
            </p>
            <p className="is-uppercase">{prop('code')(state.teams[0])}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
