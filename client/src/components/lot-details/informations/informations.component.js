import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../layout'
import './informations.style.scss'

export default ({ match }) => {
  const state = useSelector(rootState => ({
    id: rootState.lotdetails.id,
    codeImmeuble: rootState.lotdetails.codeImmeuble,
    codeBatiment: rootState.lotdetails.codeBatiment,
    codeLot: rootState.lotdetails.codeLot,
    type: rootState.lotdetails.type,
    nombrePieces: rootState.lotdetails.nombrePieces,
    surface: rootState.lotdetails.surface,
    gazDeliveryPoint: rootState.lotdetails.gazDeliveryPoint,
    electricDeliveryPoint: rootState.lotdetails.electricDeliveryPoint,
    fetching: rootState.lotdetails.fetching,
    propertyTypeDico: rootState.initialloading.dictionaries.propertyType,
  }))

  return (
    <Layout match={match}>
      <div data-component="informations" className="columns is-multiline">
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

        <div className="column is-4">
          <div className="box">
            <div className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
              Code Immeuble
            </div>
            <div className="">{state.codeImmeuble}</div>
            <div className="is-uppercase is-size-7 has-text-primary-medium has-text-weight-medium">
              Code Lot
            </div>
            <div className="">{state.codeLot}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
