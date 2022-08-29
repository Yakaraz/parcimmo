import { combineEpics } from 'redux-observable'
import AppError from './app-error.epic'
import Auth from './auth'
import InitialLoading from './initial-loading.epic'
import LotDetails from './lot-details.epic'
import Lot from './lot.epic'
import Timeline from './timeline.epic'

// La liste de toutes les epics de l'app
export default combineEpics(
  Auth,
  Lot,
  LotDetails,
  InitialLoading,
  AppError,
  Timeline,
)
