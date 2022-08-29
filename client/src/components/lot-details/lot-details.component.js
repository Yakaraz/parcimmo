import { prop } from 'ramda'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as LotDetails from '../../redux/state/lot-details.state'
import './lot-details.style.scss'

export default ({ match }) => {
  // eslint-disable-next-line no-console
  const lotId = match.params.id
  const dispatch = useDispatch()
  const onMount = useCallback(
    () => dispatch(LotDetails.fetch(lotId)),
    [dispatch, lotId],
  )
  const onUnMount = useCallback(() => dispatch(LotDetails.clean()), [dispatch])

  const state = useSelector(rootState => ({
    id: rootState.lotdetails.id,
    idLot: rootState.lotdetails.idLot,
    numeroCite: rootState.lotdetails.numeroCite,
    codeImmeuble: rootState.lotdetails.codeImmeuble,
    codeBatiment: rootState.lotdetails.codeBatiment,
    codeLot: rootState.lotdetails.codeLot,
    adresse: rootState.lotdetails.adresse,
    type: rootState.lotdetails.type,
    nombrePieces: rootState.lotdetails.nombrePieces,
    etatDuLot: rootState.lotdetails.etatDuLot,
    scheduledVisitAt: rootState.lotdetails.scheduledVisitAt,
    planifiedAt: rootState.lotdetails.planifiedAt,
    surface: rootState.lotdetails.surface,
    gazDeliveryPoint: rootState.lotdetails.gazDeliveryPoint,
    electricDeliveryPoint: rootState.lotdetails.electricDeliveryPoint,
    teams: rootState.lotdetails.teams,
    fetching: rootState.lotdetails.fetching,
    propertyTypeDico: rootState.initialloading.dictionaries.propertyType,
  }))

  useEffect(() => {
    onMount()
    return () => onUnMount()
  }, [onMount, onUnMount])

  return (
    <div
      data-component="lotdetails"
      className="columns is-12 is-multiline is-gapless"
    >
      <div className="column is-one-third-tablet is-one-quarter-desktop has-background-white aside">
        <div className="container">
          <h1 className="is-size-4 has-text-weight-bold has-text-primary-dark">
            Identifiant {state.idLot}
          </h1>
          <p>Immeuble - {state.codeImmeuble}</p>
          <p>Lot - {state.codeLot}</p>
        </div>
        <div className="container">
          <h2 className="mb-2 is-size-5 has-text-weight-bold has-text-primary">
            Prochaine Visite
          </h2>
          <div className="container">
            <p className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
              Gestionnaire attibué
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
        <div className="container lot-props">
          <h2 className="is-size-5 has-text-weight-bold has-text-primary">
            Caractéristiques du lot
          </h2>
          <div className="container">
            <p className="is-uppercase">{state.adresse.rue}</p>
            {state.adresse.rue2 && (
              <p className="is-uppercase">{state.adresse.rue2}</p>
            )}
            <p className="is-uppercase has-text-weight-medium">
              {state.adresse.codePostal}, {state.adresse.ville}
            </p>
          </div>
          <div className="container">
            <p className="is-uppercase has-text-weight-medium">
              {state.propertyTypeDico[state.type]}
            </p>
            <p className="is-uppercase">{state.etatDuLot}</p>
          </div>
          <div className="container">
            <p className="is-uppercase has-text-weight-medium">
              Groupe - {prop('name')(state.teams[0]) || 'aucun'}
            </p>
            <p className="is-uppercase">{prop('code')(state.teams[0])}</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="tabs is-toggle is-medium is-fullwidth">
          <ul>
            <li>
              <a href="#timeline">Timeline</a>
            </li>
            <li className="is-active">
              <a href="informations">Informations</a>
            </li>
            <li>
              <a href="#actionandwork">Actions et travaux</a>
            </li>
          </ul>
        </div>
        <div className="columns is-multiline">
          <div className="column is-10-tablet is-offset-1-tablet">
            <div className="columns">
              <div className="column is-9">
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>Numéro de Cité</th>
                      <th>Code Batiment</th>
                      <th>Nombre d&apos;actions requises</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {state.numeroCite || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                      <td>
                        {state.codeBatiment || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                      <td>
                        <span className="has-text-grey-light is-italic">
                          Non renseigné
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>Code Immeuble</th>
                      <th>Type de lot</th>
                      <th>Nombre de pièces</th>
                      <th>Surface</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {state.codeImmeuble || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                      <td>
                        {(state.type && state.propertyTypeDico[state.type]) || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                      <td>
                        {state.nombrePieces || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                      <td>
                        {state.surface || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="column">
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>Pdl gaz</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {state.gazDeliveryPoint || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="table is-bordered is-fullwidth">
                  <thead>
                    <tr>
                      <th>Pdl électricité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {state.electricDeliveryPoint || (
                          <span className="has-text-grey-light is-italic">
                            Non renseigné
                          </span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="column is-offset-1-tablet is-4-tablet">
            <div className="box">
              <div className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
                Code Immeuble
              </div>
              <div className="">{state.codeImmeuble}</div>
              <div className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
                Code Lot
              </div>
              <div className="">{state.codeLot}</div>
              <div className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
                Unité
              </div>
              <div className="has-text-grey">Non renseigné</div>
              <div className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
                Sous-unité
              </div>
              <div className="has-text-grey">Non renseigné</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
