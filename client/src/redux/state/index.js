import { always } from 'ramda'
import { combineReducers } from 'redux'
import Auth from './auth'
import InitialLoading from './initial-loading.state'
import LotDetails from './lot-details.state'
import Lot from './lot.state'
import NavBar from './navbar.state'
import Timeline from './timeline.state'

// INIT :: String
export const INIT = '@parcimmo/App/INIT'

// initServiceWorker :: String -> Action
export const initServiceWorker = always({ type: INIT })

export const REJECT_MAIN_ERROR = '@parcimmo/App/REJECT_MAIN_ERROR'

// rejectServerError :: Object ->  Action
export const rejectMainError = error => ({ type: REJECT_MAIN_ERROR, error })

// State :: (State, Action *) -> State
export default combineReducers({
  auth: Auth,
  initialloading: InitialLoading,
  lot: Lot,
  navbar: NavBar,
  lotdetails: LotDetails,
  timeline: Timeline,
})
