import { always, of, evolve, T } from 'ramda'
import { createReducer } from '../../utils/redux.utils'

// déclaration du state initial
export const INITIAL_STATE = {
  id: '',
  idLot: '',
  numeroCite: '',
  codeImmeuble: '',
  codeBatiment: '',
  codeLot: '',
  adresse: '',
  type: '',
  nombrePieces: '',
  etatDuLot: '',
  nextComputationAt: '',
  scheduledVisitAt: '',
  scheduledVisitStatus: '',
  planifiedAt: '',
  surface: '',
  gazDeliveryPoint: '',
  electricDeliveryPoint: '',
  teams: '',
  users: '',
  fetching: false,
  propertyTypeDico: [],
  errors: [],
}

// déclaration des types d'actions ou dit "actions"

// clean :: () -> Action
export const CLEAN = '@parcimmo/LotDetails/CLEAN'
// fetch :: () -> Action FETCH
export const FETCH = '@parcimmo/LotDetails/FETCH'

// received :: Offer -> Action RECEIVED
export const RECEIVED = '@parcimmo/LotDetails/RECEIVED'
// REJECT :: String
export const REJECT = '@parcimmo/LotDetails/REJECT_IF_ERRORS'

// Actions creators

// clean :: () -> Action
export const clean = always({ type: CLEAN })
// fetch :: () -> Action FETCH
export const fetch = id => ({ type: FETCH, id })

// received :: Object -> Action RECEIVED
export const received = properties => ({ type: RECEIVED, properties })

// reject :: String -> Action
export const reject = errors => ({ type: REJECT, errors })

// Router :: (State, Action *) -> State
export default createReducer(INITIAL_STATE, {
  [FETCH]: evolve({ fetching: T }),
  [RECEIVED]: (state, { properties }) => ({
    ...state,
    id: properties.id,
    idLot: properties.idLot,
    numeroCite: properties.numeroCite,
    codeImmeuble: properties.codeImmeuble,
    codeBatiment: properties.codeBatiment,
    codeLot: properties.codeLot,
    adresse: properties.adresse,
    type: properties.type,
    nombrePieces: properties.nombrePieces,
    etatDuLot: properties.etatDuLot,
    nextComputationAt: properties.nextComputationAt,
    scheduledVisitAt: properties.scheduledVisitAt,
    scheduledVisitStatus: properties.scheduledVisitStatus,
    planifiedAt: properties.planifiedAt,
    surface: properties.surface,
    gazDeliveryPoint: properties.gazDeliveryPoint,
    electricDeliveryPoint: properties.electricDeliveryPoint,
    teams: properties.teams,
    users: properties.users,
    fetching: false,
  }),
  [CLEAN]: always(INITIAL_STATE),
  [REJECT]: (state, { errors }) => ({
    ...state,
    fetching: false,
    errors: of(errors),
  }),
})
