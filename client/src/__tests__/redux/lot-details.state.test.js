import * as LotDetails from '../../redux/state/lot-details.state'

describe('Redux :: State :: LotDetails', () => {
  it('reduces to initial state by default', () => {
    const initialState = LotDetails.default()

    expect(initialState).toEqual(LotDetails.INITIAL_STATE)
  })

  it('reduces fetch action', () => {
    const initialState = LotDetails.default()
    const state = LotDetails.default(initialState, LotDetails.fetch())
    expect(state).toEqual({
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
      businessUnit: '',
      businessSubUnit: '',
      teams: '',
      users: '',
      nbNeededActions: '',
      fetching: true,
      propertyTypeDico: [],
      unitDico: [],
      subUnitDico: [],
    })
  })

  it('reduces received action', () => {
    const initialState = LotDetails.default()
    const props = {
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
      businessUnit: '',
      businessSubUnit: '',
      teams: '',
      users: '',
      nbNeededActions: '',
      fetching: true,
      propertyTypeDico: [],
      unitDico: [],
      subUnitDico: [],
    }
    const state = LotDetails.default(initialState, LotDetails.received(props))
    expect(state).toEqual({
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
      businessUnit: '',
      businessSubUnit: '',
      teams: '',
      users: '',
      nbNeededActions: '',
      fetching: false,
      propertyTypeDico: [],
      unitDico: [],
      subUnitDico: [],
    })
  })
})
